# Build the React app
yarn install
yarn build

# Install serve globally for production
yarn global add serve

# Serve the built app
serve -s build -l $PORT
