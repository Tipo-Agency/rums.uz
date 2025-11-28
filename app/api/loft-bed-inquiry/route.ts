import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const name = formData.get('name') as string
    const phone = formData.get('phone') as string

    // Здесь можно добавить отправку в AmoCRM или другую CRM систему
    // Пока просто возвращаем успешный ответ
    
    console.log('Loft Bed Inquiry:', { name, phone })

    return NextResponse.json({
      success: true,
      message: 'Заявка успешно отправлена'
    })
  } catch (error) {
    console.error('Error processing loft bed inquiry:', error)
    return NextResponse.json(
      { success: false, message: 'Ошибка при отправке заявки' },
      { status: 500 }
    )
  }
}

