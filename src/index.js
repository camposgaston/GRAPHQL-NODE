const { GraphQLServer } = require('graphql-yoga')
const { PrismaClient } = require('@prisma/client')
    // Resolvers
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')

const resolvers = {
    Query,
    Mutation,
    User,
    Link
}

// 3
const prisma = new PrismaClient()

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    // Creating the context as a function which returns the context. 
    // The advantage of this approach is that you can attach the HTTP request that carries 
    // the incoming GraphQL query (or mutation) to the context as well. 
    // This will allow your resolvers to read the Authorization header and validate if 
    // the user who submitted the request is eligible to perform the requested operation.
    context: request => {
        return {
            ...request,
            prisma,
        }
    },
})
server.start(() => console.log(`Server is running on http://localhost:4000`))