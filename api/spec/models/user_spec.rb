require 'rails_helper'

RSpec.describe User, type: :model do
  context 'with valid params' do
    it 'should save a user' do
      user = User.new email: 'valid@email.com', password: 'abcdef'
      expect(user.save).to be true
    end

    it 'should encrypt the password' do
      user = User.new email: 'valid@email.com', password: 'abcdef'
      user.save

      expect(user.password_digest).not_to be nil
    end
  end

  context 'when the email is missing' do
    it 'should not save the user' do
      user = User.new password: 'abcdef'
      expect(user.save).to be false
    end
  end

  context 'when the email is already taken' do
    it 'should not save the user' do
      User.create email: 'valid@email.com', password: 'abcdef'
      user = User.new email: 'valid@email.com', password: 'abcdef'
      expect(user.save).to be false
    end
  end

  context 'with an invalid email' do
    it 'should not save the user' do
      user = User.new email: 'invalid_email', password: 'abcdef'
      expect(user.save).to be false
    end
  end

  context 'with an invalid password' do
    it 'should not save the user' do
      user = User.new email: 'valid@email.com', password: ''
      expect(user.save).to be false
    end
  end
end
