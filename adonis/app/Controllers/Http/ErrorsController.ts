// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ErrorsController {
  public getError({ params }: HttpContextContract) {
    const val = parseInt(params.id)
    const x = val / (val - 1)
    if (!isFinite(x)) {
      throw new TypeError('Division by 0')
    }
    return { value: x }
  }
}
