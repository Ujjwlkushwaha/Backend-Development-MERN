# URL Shortener Service Provider

Design a URP shortener service that takes a valid URL and returns a shortened URL, redirecting the user to the previously provided URL.

✅ Also, Keep track of total visits/clicks on the URL

## Routes 

### POST /url -
Generates a new short URL and returns the Shortened URL in the format example.com/random_id

### GET  / : id  -
Redirects the user to the original URL

### GET / url/ analytics / : id-
Returns the clicks for the provided short id.

