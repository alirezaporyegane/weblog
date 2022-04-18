const Posts = require('../../admin/models/Post/Posts')
const PostCategories = require('../../admin/models/Post/Post-Categories')

class postModel {
  async getAll(req, res) {
    const skip = req.query.skip ? parseInt(req.query.skip) : ''
    const limit = req.query.limit ? parseInt(req.query.limit) : ''
    const include = req.query.include ? req.query.include : ''
    const Sort = req.query.sort ? eval(`({${req.query.sort}})`) : ''
    const categorySlug = req.query.categorySlug ? req.query.categorySlug : null
    const date = new Date()

    async function getPost(item) {
      const items = await Posts.find(item)
        .populate('primaryCategoryId')
        .select(include)
        .skip(skip)
        .limit(limit)
        .sort(Sort)
        .select([
          '_id',
          'title',
          'slug',
          'image',
          'header',
          'excerpt',
          'lead',
          'body',
          'metaTitle',
          'metaDescription',
          'featured',
          'primaryCategoryId',
          'published'
        ])

      return items
    }

    try {
      if (categorySlug !== null) {
        const PostCategoriesSlug = await PostCategories.findOne({ slug: categorySlug })
        if (PostCategoriesSlug.parentId === null) {
          const category = await PostCategories.find({ parentId: PostCategoriesSlug._id })
          if (category && category.length) {
            const keys = category.map((key) => key._id)
            const otherCategory = await PostCategories.find({ parentId: { $in: keys } })
            if (otherCategory && otherCategory.length) {
              const Otherkeys = otherCategory.map((key) => key._id)
              const subcategory = await PostCategories.find({ parentId: { $in: Otherkeys } })
              const subPost = subcategory && subcategory.length ? subcategory.map((o) => o._id) : ''
              Otherkeys.push(...keys, ...subPost)

              const post = await getPost({
                primaryCategoryId: { $in: Otherkeys },
                published: { $lte: date.toISOString() }
              })

              res.status(200).json(post)
            } else {
              const post = await getPost({
                primaryCategoryId: { $in: keys },
                published: { $lte: date.toISOString() }
              })

              res.status(200).json(post)
            }
          } else {
            const post = await getPost({
              primaryCategoryId: PostCategoriesSlug._id,
              published: { $lte: date.toISOString() }
            })

            res.status(200).json(post)
          }
        } else {
          const mainCategory = await PostCategories.find({ parentId: PostCategoriesSlug._id })
          if (mainCategory && mainCategory.length) {
            const items = mainCategory.map((o) => o._id)
            const CategorySlugs = await PostCategories.find({ parentId: items })
            if (CategorySlugs && CategorySlugs.length) {
              items.push(PostCategoriesSlug._id, ...CategorySlugs.map((o) => o._id))
              const post = await getPost({
                primaryCategoryId: { $in: items },
                published: { $lte: date.toISOString() }
              })

              res.status(200).json(post)
            } else {
              items.push(PostCategoriesSlug._id)
              const post = await getPost({
                primaryCategoryId: { $in: items },
                published: { $lte: date.toISOString() }
              })

              res.status(200).json(post)
            }
          } else {
            const post = await getPost({
              primaryCategoryId: PostCategoriesSlug._id,
              published: { $lte: date.toISOString() }
            })

            res.status(200).json(post)
          }
        }
      } else {
        const post = await getPost({ published: { $lte: date.toISOString() } })

        res.status(200).json(post)
      }
    } catch (err) {
      res.status(500).json({
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async getCount(req, res) {
    const categorySlug = req.query.categorySlug ? req.query.categorySlug : null

    async function getPost(item) {
      const items = await Posts.find(item).countDocuments()

      return items
    }

    try {
      if (categorySlug !== null) {
        const PostCategoriesSlug = await PostCategories.findOne({ slug: categorySlug })
        if (PostCategoriesSlug.parentId === null) {
          const category = await PostCategories.find({ parentId: PostCategoriesSlug._id })
          if (category && category.length) {
            const keys = category.map((key) => key._id)
            const otherCategory = await PostCategories.find({ parentId: { $in: keys } })
            if (otherCategory && otherCategory.length) {
              const Otherkeys = otherCategory.map((key) => key._id)
              const subcategory = await PostCategories.find({ parentId: { $in: Otherkeys } })
              const subPost = subcategory && subcategory.length ? subcategory.map((o) => o._id) : ''
              Otherkeys.push(...keys, ...subPost)

              const post = await getPost({ primaryCategoryId: { $in: Otherkeys } })

              res.status(200).json(post)
            } else {
              const post = await getPost({ primaryCategoryId: { $in: keys } })

              res.status(200).json(post)
            }
          } else {
            const post = await getPost({ primaryCategoryId: PostCategoriesSlug._id })

            res.status(200).json(post)
          }
        } else {
          const mainCategory = await PostCategories.find({ parentId: PostCategoriesSlug._id })
          if (mainCategory && mainCategory.length) {
            const items = mainCategory.map((o) => o._id)
            const CategorySlugs = await PostCategories.find({ parentId: items })
            if (CategorySlugs && CategorySlugs.length) {
              items.push(PostCategoriesSlug._id, ...CategorySlugs.map((o) => o._id))
              const post = await getPost({ primaryCategoryId: { $in: items } })

              res.status(200).json(post)
            } else {
              items.push(PostCategoriesSlug._id)
              const post = await getPost({ primaryCategoryId: { $in: items } })

              res.status(200).json(post)
            }
          } else {
            const post = await getPost({ primaryCategoryId: PostCategoriesSlug._id })

            res.status(200).json(post)
          }
        }
      } else {
        const post = await getPost()

        res.status(200).json(post)
      }
    } catch (err) {
      res.status(500).json({
        msg: 'Internal Server Error',
        code: 500
      })
    }
  }

  async getBySlug(req, res) {
    const include = req.query.include ? req.query.include : ''
    const slug = req.params.slug

    Posts.findOne({ slug: slug })
      .populate('primaryCategoryId')
      .populate('categoryIds')
      .select([
        '_id',
        'title',
        'slug',
        'image',
        'header',
        'excerpt',
        'lead',
        'body',
        'metaTitle',
        'metaDescription',
        'featured',
        'primaryCategoryId',
        'published'
      ])
      .select(include)
      .then((result) => {
        res.status(200).json(result)
      })
      .catch(() => {
        res.status(500).json({
          msg: 'Internal Server Error',
          code: 500
        })
      })
  }
}

module.exports = new postModel()
