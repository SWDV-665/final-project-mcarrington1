# Collections App

## What Is

Collections app is a simple app that will allow you to capture information about a collection of yours, such as baseball cards, fruit, or video games. This is communicated to a RESTful API and then stored in MongoDB. This requires both the app and the API.

This has been tested on Web and Android, has not been tested on iOS.

This was created by me, M.J. Carrington.You can also check out a video walkthrough in the root of the repo.

## Features
- View a list of your collection items
- View a detailed modal view of a single item
- Edit, Add, and delete items to your collection
- Add a photo to a collection (Android-only)

## Fields Supported
- Name
- Description
- Condition
- Quantity
- Image

## Coming Soon Features
- Ability to group into sub-collections
- Ability to scan in barcodes
- Add multiple photos
- Capability to upload images from the web client
- Image uploading / saving optimizations

# Collections API
Simple API that uses Express and Mongoose. Sends data to MongoDB.