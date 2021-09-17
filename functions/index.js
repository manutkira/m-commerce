const functions = require("firebase-functions");
const stripe = require('stripe')('sk_test_51JZrutIbWCB3LvS8pQzNJ5LvWBwCR13Mf7ETzlxGSIjSMAmhDkiHyFNDlBMOCDGrF0FjiTV52f6yzYSUIij3RKaO00da9FfptW');
const cors = require('cors')({origin: true})
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//     functions.logger.info("Hello logs!", {structuredData: true});
//     response.send("Hello from Firebase!");
// });

exports.CheckoutSession = functions.https.onRequest((request, response) => {

    // cors(request, response, () => {
        stripe.checkout.sessions.create({
            success_url: 'https://example.com/success',
            cancel_url: 'https://example.com/cancel',
            payment_method_types: ['card'],
            line_items: [
              {
                  name: 'T-shirt',
                  description: 'Comfortable cotton t-shirt',
                  amount: 1500,
                  currency: 'aud',
                  quantity: 2
              },
            ],
        }, function(err, session){
            response.send(session)
        // })
    })

});
