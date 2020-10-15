const { GraphQLServer } = require('graphql-yoga')
const { PrismaClient } = require('@prisma/client')

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: async(parent, args, context) => {
            return context.prisma.link.findMany()
        },
    },
    Mutation: {
        post: (parent, args, context) => {
            const newLink = context.prisma.link.create({
                data: {
                    url: args.url,
                    description: args.description,
                },
            })
            return newLink
        },
    },
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