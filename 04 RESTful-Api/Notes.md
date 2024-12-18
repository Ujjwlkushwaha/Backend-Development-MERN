# RESTful API

### Blogs on RESTful

* [Why RESTful Important](https://www.geeksforgeeks.org/why-rest-api-is-important-to-learn/?ref=ml_lbp)

## REST ( Representational state transfer )
* REST is a set of architectural constraints, not a protocol or a standard.
* API developers can implement REST in a variety of ways.

## API ( Application program interface )
* if you want to interact with a computer or system to retrieve information or perform a function, an API helps you communicate what you want to that system so it can understand and fulfill the request. 

### ✅ In order for an API to be considered RESTful, it has to conform to these criteria:

### 1. Client-Server Setup:
* There’s a clear separation between the client (who asks for data) and the server (who provides it). They communicate using HTTP.

### 2. Stateless Communication:
* Each request from the client is treated as a fresh, independent interaction. The server doesn’t remember anything about the client between requests.

### 3. Cacheable Data:
* The data sent from the server can be cached (stored temporarily) so that future interactions can be faster and more efficient.

### 4. Consistent Interface:
Everyone communicates in the same, predictable way. This includes:

* #### Clear Resource Identification: 
    * You always know exactly what you're asking for.

* #### Modifiable Resources: 
    * The data you get back includes enough information for you to make changes if needed.

* #### Self-Explanatory Messages:
    * The server tells you how to handle the response in a way you can understand.
* #### Links to Actions:
    * When you get a resource, you also get links to other things you can do next.

### 5. Layered Structure:
* The system is organized into layers (like security, load balancing, etc.), but the client only sees the final results and doesn’t need to worry about how it all works behind the scenes.

### 6. Optional Code-on-Demand:
* The server can send code to the client (like a small program) to add extra functionality, but this is optional.