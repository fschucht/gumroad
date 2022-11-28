# Gumroad Demo Application

This repository holds a demo application that allows users to add written reviews for a product.

## Process

Gumroad makes money if creators sell their products on the platform. Therefore, in my mind, making sure that creators succeed in selling their products with a good experience for their customers is the highest priority.

Gumroad creators will be successful if all their needs are met. As a result, I first started researching common issues and feature requests by creators. I used websites like Trust Pilot, G2, and the official feature request page to find a problem to work on.

After I finished the research, I found the following potential problems:

- Creators expressed multiple times that they would like to customize their emails and receipts.
- Creators wanted to be able to import subscribers into their email lists.
- Creators wanted to offer their customers an easier way to access their bought files.
- Creators wanted the possibility for their customers to add written reviews.

Once I compiled this initial list of problems, I picked a problem based on two criteria:

- How significant is the impact for creators.
- Can the problem be solved in a demo application in ~8 hours?

Based on these criteria, I built a demo for written product reviews. I noticed that many Gumroad creators already embed positive reviews into their product descriptions. Having these reviews in a central place could benefit the creators, as it doesn't require manual curation by creators and reduces their manual work.

It took roughly 10 hours to finish the demo application.

## Getting Started

To run the application, please follow these steps:

1. Install docker: https://docs.docker.com/get-docker/
2. Create `./.env` based on the `./.env.example` file.
3. Create `./api/.env` based on the `./api/.env.example` file. Make sure that the database values match the values set up in step 2.
2. Start the dockerized applications: `docker-compose up`.

**NOTE:** As this is a demo app, I committed the master.key to the repository for easier sharing. However, this is not a best practice and shouldn't be done in an actual production application.

## Running Tests

### API

To run tests, please follow these steps:

1. Run `docker ps` and find the container id of `gumroad-api`.
2. Run `docker exec CONTAINER_ID bundle exec rspec`, where `CONTAINER_ID` is the id from the first step.

You cannot run tests outside of docker because of how the database is configured. During the container startup, we create the databases, migrate them, and seed the initial data. However, since the docker container hostname is not `localhost` but `db` (the name of the service in the `docker-compose.yml`), we cannot connect to it locally with the same environment configuration.

### Frontend

To run tests, please follow these steps:

1. Run `cd frontend` to move into the `frontend` directory.
2. Run `npm run test`.

## Usage

To use the demo application, follow these steps:

1. Open the following page: http://localhost:3000.
2. Click on "Register".
3. Create a user account.
4. Write your review.

You can see a live demo here:

https://user-images.githubusercontent.com/7281549/204162423-49310cf9-ea84-4c2c-bcf0-0a4f79cdffbe.mp4

## Future Improvements

The following improvements could be done in the future but have been omitted to limit the time worked on the project:

- Test routes and interactive components with jest and enzyme.
- Add usernames to the user model and show them instead of the email for each review.
- Do not return the `email` field in the `/api/v2/products/:id/product_reviews` route as they can be considered sensitive information.
- Improve response styles for mobile.
- Inform the creator about new reviews.
- Highlight the best and worst reviews to give customers the opportunity to make a balanced decision.
- Use a framework like Next.js to prerender routes on the server. This would avoid jumping content on each route which happens from loading data.
