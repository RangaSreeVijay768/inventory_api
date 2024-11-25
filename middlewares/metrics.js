import client from 'prom-client'; // Prometheus client

// Create a Registry to register the metrics
const register = new client.Registry();

// Define a counter for CRUD operations with dynamic labels
const crudRequestCounter = new client.Counter({
    name: 'api_crud_requests_total',
    help: 'Total number of CRUD requests',
    labelNames: ['entity', 'operation', 'route'], // Label for route path
});

// Register the metric in the registry
register.registerMetric(crudRequestCounter);

// Middleware to track API metrics
const trackCrudMetrics = (req, res, next) => {
    const { method } = req;

    let entity = 'unknown'; // Default entity
    let operation = 'unknown'; // Default operation
    let route = 'unknown'; // Default route path

    // Check if req.route exists to get the route path
    if (req.route && req.route.path) {
        route = req.route.path;
    }
    //console.log(route);
    // Determine the entity based on the route (adjust based on your project)
    if (route.startsWith('/items')) {
        entity = 'item';
    } else if (route.startsWith('/vendors')) {
        entity = 'vendor';
    }

    // Determine the operation based on HTTP method
    if (method === 'POST') operation = 'create';
    if (method === 'PUT') operation = 'update';
    if (method === 'DELETE') operation = 'delete';
    if (method === 'GET') operation = 'read';

    // Increment the counter with entity, operation, and route labels
    if(entity !== "unknown"){
        console.log(entity+':'+operation+':'+route)
        crudRequestCounter.inc({ entity, operation, route });
    }

    next();
};

// Expose the metrics via a route for Prometheus to scrape
const exposeMetrics = async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
};

export { trackCrudMetrics, exposeMetrics };
