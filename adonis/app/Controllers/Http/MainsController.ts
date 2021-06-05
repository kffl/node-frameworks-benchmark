// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Redis from '@ioc:Adonis/Addons/Redis'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

const reqSchema = schema.create({
  number: schema.number(),
  string: schema.string({}, [rules.minLength(5)]),
})

export default class MainsController {
  private static fibo(n: number) {
    if (n < 2) return 1
    else return this.fibo(n - 2) + this.fibo(n - 1)
  }

  public getStatic() {
    return { ok: true }
  }

  public getFib() {
    return { res: MainsController.fibo(23) }
  }

  public async getRedis() {
    const val = await Redis.get('counter')
    return { value: val }
  }

  public async getValidation({ request }: HttpContextContract) {
    await request.validate({ schema: reqSchema })
    return { ok: true }
  }
}
