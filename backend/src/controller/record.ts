import express from 'express';
import { connectToDatabase } from '../lib/mongodb';
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
export const recordRoutes = express.Router();

// This will help us connect to the database

// This section will help you get a list of all the records.
recordRoutes.route('/listings').get(async function (_req, res) {
  const { database } = await connectToDatabase();
  console.log(database.databaseName);

  const results = await database.collection('listingsAndReviews').find({}).limit(50).toArray();
  res.status(200).json({ data: results });
});

// This section will help you create a new record.
recordRoutes.route('/listings/recordSwipe').post(async function (req, res) {
  const { database } = await connectToDatabase();
  const matchDocument = {
    listing_id: req.body.id,
    last_modified: new Date(),
    session_id: req.body.session_id,
    direction: req.body.direction
  };

  database.collection('matches').insertOne(matchDocument);
});

// This section will help you update a record by id.
recordRoutes.route('/listings/updateLike').post(async function (req, res) {
  const { database } = await connectToDatabase();
  const listingQuery = { _id: req.body.id };
  const updates = {
    $inc: {
      likes: 1
    }
  };

  database.collection('listingsAndReviews').updateOne(listingQuery, updates);
});

// This section will help you delete a record.
recordRoutes.route('/listings/delete/:id').delete(async (req, res) => {
  const { database } = await connectToDatabase();
  const listingQuery = { listing_id: req.body.id };

  database.collection('listingsAndReviews').deleteOne(listingQuery);
});
