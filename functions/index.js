const functions = require("firebase-functions");
const cors = require('cors')({origin: true})
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
    //     functions.logger.info("Hello logs!", {structuredData: true});
    //     response.send("Hello from Firebase!");
    // });
    
    exports.CheckoutSession = functions.https.onRequest((request, response) => {
        
        const stripe = require('stripe')('sk_test_51JasmtLmIk3cwhpKbWGEqh3dTtwT2T95Hzzb8OFc5LaRbk734KmLFvIrLgkHtXy4t7Bh3vw7XqPopCgl6r9hxViD002G3xDx9o');
    cors(request, response, () => {
        stripe.checkout.sessions.create({
            success_url: 'http://localhost:8080/success',
            cancel_url: 'http://localhost:8080',
            payment_method_types: ['card'],
            line_items: [
              {
                  name: 'T-shirt',
                  description: 'Comfortable cotton t-shirt',
                  amount: 3000,
                  currency: 'aud',
                  quantity: 2
              },
            ],
        }, function(err, session){
            response.send(session)
        })
    })

});
