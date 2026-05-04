# cs128-honors-sp26

## Group Members
Shreyas Das (das41@illinois.edu)

Tanush Kulkarni (tanushk2@illinois.edu)

Yash Gulati (ygulati2@illinois.edu)

Abhinav Raj (araj10@illinois.edu)

## Project Introduction

The premise of this project is a digital scavenger hunt using files. Users will have the capability to uploads files (like an image, program, or text file) and create various challenges and riddles associated with those files. The goal is for other users to then be able download the file and find something hidden inside it — like a secret message, password, or clue. Users  can explore the file using tools or programming knowledge to solve the puzzle. Once they find the answer, they submit it on the website and get points or credit for solving it. It's basically like geocaching, but instead of finding a hidden object in the real world, you’re finding hidden things inside digital files. It's similar to reverse engineering challenges in CTFs. The goal of this project is to create a community where users can enjoy solving puzzles, while building their techinical skills.

## Technical Overview

### Project Components


This project has four main components: the home page, the score board page, the challenges page, and the create page.

The home page is the entry point for this project, and it will provide a brief introduction From the home page, users will be able to navigate to the create page, the challenges page, and the scoreboard page. 

The scoreboard page will display which users have completed the most amount of challenges and accumulated the most amount of points. Once users complete a challenge, their total points will be updated and they will be able to see where they are on the scoreboard.

The challenges page will display the various challenges available for the users to solve. Information such as name of the challenge, a brief decription, and point values will be displayed. Users will be able to click on a challenge, download the relevant file and begin solving. Once completed, the user can then submit their solution.

The create page will allow users to create their own challenges by uploading various files. The user can set a difficulty level for this challenge, which will then assign a point value for the challenge. Solving easy challenges awards 5 points, solving medium-difficulty challenges awards 10 points, and solving hard challenges awards 20 points. Additionally, we will attempt to have some form of input validation to ensure that users cannot upload malware.

### Tech Stack

For the frontend of the project we are using html and css. For the functions and various data-structures in this project we are using various rust crates. For the backend we are using supabase to store information such as user points, challenge files, and submissions. Finally, we will be using Python for input validation.

## Checkpoint Goals

### Checkpoint 1:

By checkpoint one, we want each member of the team to have their own branch on the repo, and begin working on their respective page. We also want our stub functions to be finished and have a rough first iteration for the website.

### Checkpoint 2:

By checkpoint two, we want 90% of the project to be done. This means have all of our functions and components working properly with no compliation errors within the code. We also want a fully working backend that is able to store the immense amount of data in this project.


## Possible Challenges

 This project has several key challenges. To begin, we may need to learn new rust crates that we are not familiar with. Learning this will take time and may intially cause a few errors. Secondly, we need to ensure that the final project is able to properly incorporate the various features we intended. Since we are all working on seperate branches, it is crucial that the final main branch has all of the code from these branches and no code is lost. There maybe issues surrounding merge conflicts. Finally, the input validation for this project poses a significant challenge and may be difficult to implement. 
