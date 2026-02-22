/* index.js 수정 */

// 탭 전환 로직 (유지)
function openTab(evt, tabName){
    const tabs = document.querySelectorAll(".tab-content") 
    const tabButtons = document.querySelectorAll(".tab-btn")

    tabs.forEach((tab) => tab.style.display = 'none')
    tabButtons.forEach((btn) => btn.classList.remove("tab-active"))

    document.querySelector(`[data-tab-name=${tabName}]`).style.display = 'block'
    evt.target.classList.add("tab-active")
}

// 테마 변경 함수 삭제됨! (switchTheme 제거)

// 다크 모드 로직 (유지)
if (localStorage.getItem('color-mode') === 'dark' || (!('color-mode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('tw-dark')
} else {
    document.documentElement.classList.remove('tw-dark')
}
updateToggleModeBtn()

function toggleMode(){
    document.documentElement.classList.toggle("tw-dark")
    updateToggleModeBtn()
}

function updateToggleModeBtn(){
    const toggleIcon = document.querySelector("#toggle-mode-icon")
    if (document.documentElement.classList.contains("tw-dark")){
        toggleIcon.classList.replace("bi-sun-fill", "bi-moon-fill")
        localStorage.setItem("color-mode", "dark")
    } else {
        toggleIcon.classList.replace("bi-moon-fill", "bi-sun-fill")
        localStorage.setItem("color-mode", "light")
    }
}