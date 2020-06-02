const Article = require('../models/article')

class ArticleCtl {
    async find(ctx) {
        const {
            per_page = 10
        } = ctx.query;
        const page = Math.max(ctx.query.page * 1, 1) - 1
        const perPage = Math.max(per_page * 1, 1)
        const key = new RegExp(ctx.query.key)
        ctx.body = await Article.find({
            title: key
        }).limit(perPage).skip(perPage * page)
    }

    async findOne(ctx){
        const id = ctx.params.id
        const article = await Article.findById(id)
        ctx.body = article
    }

    async create(ctx) {
        ctx.verifyParams({
            title: {
                type: 'string',
                require: true
            },
            content: {
                type: 'string',
                require: true
            }
        })
        const article = await new Article({
            ...ctx.request.body
        }).save()
        ctx.body = article
    }
     
    async checkArticleExist(ctx, next){
        const id = ctx.params.articleId
        const article = await Article.findById(id)
        if(!article){
            ctx.throw(404, '文章不存在')
        }
        ctx.state.article = article
        await next()
    }

    async getTopic(ctx){
        const topic = ctx.params.topic
        const articles = await Article.find({topic})
        const arr = articles.map(({title, _id, topic}) => ({title, _id, topic}))
        ctx.body = arr
    }
}

module.exports = new ArticleCtl()