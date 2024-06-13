const { test, expect, beforeEach, describe } = require('@playwright/test')
const { login, postBlog, createUser } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await createUser(request, 'muuli', 'Perä Kärry', 'salasana')

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('login to application')
    await expect(locator).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await login(page, 'muuli', 'salasana')
      const message = await page.getByText('Perä Kärry logged in')
      await expect(message).toBeVisible()

      const header = await page.getByRole('heading', { name: 'blogs' })
      await expect(header).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await login(page, 'muuli', 'hattivatti')
      const error = await page.getByText('invalid password')
      await expect(error).toBeVisible()

      const createButton = await page.getByRole('button', { name: 'Create new blog' })
      await expect(createButton).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await login(page, 'muuli', 'salasana')
    })

    test('a new blog can be created', async ({ page }) => {
      await expect(page.getByRole('button', { name: 'Create new blog' })).toBeVisible()
      await postBlog(page, 'Title', 'Author', 'http://asd')

      const msg = await page.getByText('A new blog "Title" by Author added')
      await expect(msg).toBeVisible()
      await expect(page.getByText('Title - Authorview')).toBeVisible()

      await expect(page.getByTestId('titlefield')).not.toBeVisible()
    })

    describe('and there are blogs in list', () => {
      beforeEach(async ({ page }) => {
        await postBlog(page, 'Eka', 'Joku', 'linkki')
        await postBlog(page, 'Toka', 'Kuka?', 'tkoäly')
      })

      test('a blog can be liked', async ({ page }) => {
        await page.locator('div').filter({ hasText: /^Toka - Kuka\?view$/ }).getByRole('button').click()

        await expect(page.getByText('0like')).toBeVisible()
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('1like')).toBeVisible()


        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('2like')).toBeVisible()
      })

      test('a blog can be deleted', async ({ page }) => {
        await page.getByText('Eka - Jokuview').getByRole('button').click()

        page.on('dialog', dialog => dialog.accept())
        await page.getByRole('button', { name: 'delete' }).click()

        await expect(page.getByText('Deleted')).toBeVisible()
        await expect(page.getByText('Eka - Joku')).not.toBeVisible()
      })

      test('only the blogs poster has delete button', async ({ page, request }) => {
        await createUser(request, 'janne', 'janne', 'janne')
        await page.getByRole('button', { name: 'logout' }).click()
        await login(page, 'janne', 'janne')

        await expect(page.getByText('Eka - Joku')).toBeVisible()

        await page.getByText('view').first().click()
        await page.getByText('view').click()

        await expect(page.getByText('linkki')).toBeVisible()
        await expect(page.getByText('tkoäly')).toBeVisible()

        await expect(page.getByRole('button', { name: 'delete' })).not.toBeVisible()
      })

      const like = async (locator) => {
        await locator.getByRole('button').click()
        await locator.getByText('like').click()
        await locator.getByText('hide').click()
        await locator.getByText('view').waitFor()
      }

      test ('blogs are sorted by likes', async ({ page }) => {
        // Haetaan ylin blogi:
        const topBlog = await page.locator('.blog').first()
        await expect(topBlog.getByText('Eka - Joku')).toBeVisible()

        // Tykätään 'toka'sta kahdesti
        for (let i = 0; i < 2; i++) {
          await like(page.getByText('Toka'))
        }

        // Testataan että 'toka' on ensimmäisenä
        await expect(topBlog.getByText('Eka - Joku')).not.toBeVisible()
        await expect(topBlog.getByText('Toka - Kuka')).toBeVisible()

        // Tykätään 'eka'sta kolmesti
        for (let i = 0; i < 3; i++) {
          await like(page.getByText('Eka'))
        }

        // Testataan että 'eka' on ensimmäisenä
        await expect(topBlog.getByText('Eka - Joku')).toBeVisible()
        await expect(topBlog.getByText('Toka - Kuka')).not.toBeVisible()
      })
    })
  })

})