"use client"

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

interface AmoFormsConfig {
  id: string
  hash: string
  scriptUrl: string
}

export function useAmoForms(config: AmoFormsConfig) {
  const pathname = usePathname()
  const isInitialized = useRef(false)
  const scriptElement = useRef<HTMLScriptElement | null>(null)
  const initScriptElement = useRef<HTMLScriptElement | null>(null)
  const moveButtonScriptElement = useRef<HTMLScriptElement | null>(null)

  useEffect(() => {
    // Агрессивная очистка всех скриптов AmoCRM
    const cleanup = () => {
      // Удаляем все скрипты AmoCRM из head
      const allScripts = document.head.querySelectorAll('script')
      allScripts.forEach(script => {
        if (script.id.includes('amoforms_') || script.innerHTML.includes('amo_forms_')) {
          document.head.removeChild(script)
        }
      })

      // Удаляем все скрипты AmoCRM из body
      const bodyScripts = document.body.querySelectorAll('script')
      bodyScripts.forEach(script => {
        if (script.id.includes('amoforms_') || script.innerHTML.includes('amo_forms_')) {
          document.body.removeChild(script)
        }
      })

      // Очищаем все глобальные переменные AmoCRM
      if (typeof window !== 'undefined') {
        delete (window as any).amo_forms_params
        delete (window as any).amo_forms_load
        delete (window as any).amo_forms_loaded
        delete (window as any).clickAmoButton
        
        // Очищаем все функции, которые могли быть добавлены
        Object.keys(window).forEach(key => {
          if (key.includes('amo_forms_') || key.includes('amoforms_')) {
            delete (window as any)[key]
          }
        })
      }

      // Удаляем кнопку AmoCRM если она существует
      const amoButton = document.getElementById('amoforms_action_btn')
      if (amoButton) {
        amoButton.remove()
      }

      // Сбрасываем ссылки на элементы
      scriptElement.current = null
      initScriptElement.current = null
      moveButtonScriptElement.current = null
    }

    // Инициализируем скрипты
    const initializeAmoForms = () => {
      // Сначала очищаем
      cleanup()

      // Добавляем инициализационный скрипт
      initScriptElement.current = document.createElement('script')
      initScriptElement.current.innerHTML = `!function(a,m,o,c,r,m){a[o+c]=a[o+c]||{setMeta:function(p){this.params=(this.params||[]).concat([p])}},a[o+r]=a[o+r]||function(f){a[o+r].f=(a[o+r].f||[]).concat([f])},a[o+r]({id:"${config.id}",hash:"${config.hash}",locale:"ru"}),a[o+m]=a[o+m]||function(f,k){a[o+m].f=(a[o+m].f||[]).concat([[f,k]])}}(window,0,"amo_forms_","params","load","loaded");`
      document.head.appendChild(initScriptElement.current)

      // Добавляем основной скрипт
      scriptElement.current = document.createElement('script')
      scriptElement.current.id = `amoforms_script_${config.id}`
      scriptElement.current.async = true
      scriptElement.current.charset = 'utf-8'
      scriptElement.current.src = config.scriptUrl
      document.head.appendChild(scriptElement.current)

      isInitialized.current = true
    }

    // Добавляем функцию для клика по кнопке
    const addClickHandler = () => {
      if (typeof window !== 'undefined') {
        (window as any).clickAmoButton = function() {
          const amoButton = document.getElementById('amoforms_action_btn')
          if (amoButton) {
            amoButton.click()
          }
        }
      }
    }

    // Добавляем функцию для перемещения и скрытия кнопки
    const addMoveButtonHandler = () => {
      moveButtonScriptElement.current = document.createElement('script')
      moveButtonScriptElement.current.innerHTML = `
        function moveButton() {
          const btn = document.getElementById('amoforms_action_btn');
          const target = document.getElementById('amocrm_btn');
          if (btn && target) {
            target.appendChild(btn);
            btn.style.display = 'none';
          } else {
            setTimeout(moveButton, 500);
          }
        }
        setTimeout(moveButton, 1000);
      `
      document.head.appendChild(moveButtonScriptElement.current)
    }

    // Инициализируем всё
    initializeAmoForms()
    addClickHandler()
    addMoveButtonHandler()

    // Очистка при размонтировании или изменении маршрута
    return cleanup
  }, [pathname, config.id, config.hash, config.scriptUrl])

  return {
    isInitialized: isInitialized.current
  }
} 