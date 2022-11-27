FROM ruby:3.1.2

RUN mkdir /app
WORKDIR /app

COPY Gemfile .
COPY Gemfile.lock .

RUN gem update bundler
RUN bundle lock --add-platform x86_64-linux
RUN bundle install

COPY . .

EXPOSE 3000

CMD bin/rails db:create && bin/rails db:migrate && bin/rails db:seed && bin/rails server -b 0.0.0.0