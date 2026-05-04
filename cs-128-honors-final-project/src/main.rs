use axum::{Json, Router, extract::Path, http::StatusCode, routing::post};
use firebase_rs::*;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use tower_http::cors::CorsLayer;

#[derive(Serialize, Deserialize, Debug)]
struct Puzzle {
    #[serde(default)]
    title: String,
    #[serde(default)]
    description: String,
    #[serde(default)]
    answer: String,
    #[serde(default)]
    difficulty: String,
    #[serde(default)]
    number_of_solves: u32,
}

#[derive(Serialize, Deserialize, Debug)]
struct FirebaseResponse {
    name: String,
}

#[derive(Deserialize)]
struct SolveRequest {
    answer: String,
}

#[derive(Serialize)]
struct SolveResponse {
    correct: bool,
}

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/api/puzzles", post(create_puzzle_handler))
        .route("/api/puzzles/{id}/solve", post(solve_puzzle_handler))
        .layer(CorsLayer::permissive());

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    println!("Rust server running on http://localhost:3000");
    axum::serve(listener, app).await.unwrap();
}

async fn solve_puzzle_handler(
    Path(id): Path<String>,
    Json(body): Json<SolveRequest>,
) -> Result<Json<SolveResponse>, StatusCode> {
    let firebase = Firebase::new("https://rust-c5706-default-rtdb.firebaseio.com")
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    let puzzle = firebase.at("puzzles").at(&id).get::<Puzzle>().await
        .map_err(|_| StatusCode::NOT_FOUND)?;

    if body.answer.trim().to_lowercase() != puzzle.answer.trim().to_lowercase() {
        return Ok(Json(SolveResponse { correct: false }));
    }

    let mut patch = HashMap::new();
    patch.insert("number_of_solves", puzzle.number_of_solves + 1);
    firebase.at("puzzles").at(&id).update(&patch).await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(SolveResponse { correct: true }))
}

async fn create_puzzle_handler(
    Json(puzzle): Json<Puzzle>,
) -> Result<Json<FirebaseResponse>, StatusCode> {
    let firebase = Firebase::new("https://rust-c5706-default-rtdb.firebaseio.com")
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    let result = firebase.at("puzzles").set(&puzzle).await;

    match result {
        Ok(res) => {
            let response: FirebaseResponse = serde_json::from_str(&res.data)
                .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;
            Ok(Json(response))
        }
        Err(e) => {
            eprintln!("Firebase error: {:?}", e);
            Err(StatusCode::INTERNAL_SERVER_ERROR)
        }
    }
}
