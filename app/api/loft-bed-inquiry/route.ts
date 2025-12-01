import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    // Добавляем дополнительные данные
    formData.append('source', 'loft-bed')
    formData.append('timestamp', new Date().toISOString())
    formData.append('user_agent', request.headers.get('user-agent') || '')
    formData.append('ip', request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown')

    // Отправляем данные на внешний API
    const response = await fetch('https://qp1-nova.ru/api/events/nova_site_market/woodlyworld.amocrm.ru/5b382e211cb8/', {
      method: 'POST',
      body: formData,
      headers: {
        'User-Agent': 'Loft-Bed-Inquiry-Form/1.0',
      },
    })

    if (response.ok) {
      return NextResponse.json({ 
        success: true, 
        message: 'Заявка успешно отправлена',
        status: response.status 
      })
    } else {
      console.error('API Error:', response.status, response.statusText)
      return NextResponse.json(
        { 
          success: false, 
          message: 'Ошибка при отправке заявки',
          status: response.status 
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Server Error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Внутренняя ошибка сервера',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

