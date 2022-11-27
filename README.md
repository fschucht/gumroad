# Gumroad Demo Application

This repository holds a demo application that allows the user to write reviews for a product.

## Process

Gumroad makes money if creators sell their products on the platform. Therefore, making sure that creators succeed in selling their products with a good experience for their customers is the highest priority.

Gumroad creators will be successful if all their needs are met. Therefore, I first started researching common issues and feature requests by creators. I used websites like Trust Pilot, G2, and the official feature request page to find a problem to work on.

After I finished the research, I found the following potential problems:

- Creators expressed multiple times that they would like to customize their emails and receipts.
- Creators wanted to be able to import subscribers into their email lists.
- Creators wanted to offer their customers an easier way to access their bought files.
- Creators wanted the possibility for their customers to add written reviews.

Once I compiled this initial list of problems, I picked a problem based on two criteria:

- How significant is the impact for creators.
- Can the problem be solved in a demo application in ~8 hours?

Based on these criteria, I built a demo for written product reviews. I noticed that Gumroad creators already embed positive reviews into their product descriptions. Having these reviews in a central place could benefit the creators, as it doesn't require manual curation by creators.

## Getting Started

To run the application, please follow these steps:

1. Install docker: https://docs.docker.com/get-docker/
2. Start the dockerized applications: `docker-compose up`

## Running Tests

To run tests, please follow these steps:

1. Run `docker ps` and find the container id of `gumroad-api`
2. Run `docker exec CONTAINER_ID bundle exec rspec`, where `CONTAINER_ID` is the id from the first step

## Usage

To use the demo application, follow these steps:

1. Open the following page: http://localhost:3000
2. Click on "Register"
3. Create a user account
4. Click on "Login"
5. Log into your user account
6. Write your review