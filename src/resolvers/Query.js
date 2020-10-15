// feed function query with params, pagination and sorting
async function feed(parent, args, context, info) {
    const where = args.filter ? {
        OR: [
            { description: { contains: args.filter } },
            { url: { contains: args.filter } },
        ],
    } : {}

    const links = await context.prisma.link.findMany({
        where,
        skip: args.skip,
        take: args.take,
        orderBy: args.orderBy
    })

    return links
}

module.exports = {
    feed,
}