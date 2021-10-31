(function(){
  if(!document.getElementById('--h-sky-theme-popup')) {
    injectTheme()
    setDarkSlideShow()
    return
  }

  chrome.storage.sync.get('themes', ({ themes }) => {
    chrome.storage.sync.get('selectedTheme', ({ selectedTheme }) => {
      themes.forEach(theme => {
        const themeIcon = renderThemeIcon(theme)
        
        if (selectedTheme && selectedTheme.name === theme.name) {
          themeIcon.classList.add('selected')
          changeTheme(themeIcon, theme)
        }
        
        const container = document.getElementById('--h-sky-theme-popup')
        container.appendChild(themeIcon)
      })
    })
  })

  const darkCheckbox = document.getElementById('--h-dark-checkbox')

  chrome.storage.sync.get('isDark', ({ isDark }) => {
    darkCheckbox.checked = isDark
    changeDarkMode()

    darkCheckbox.addEventListener('change', changeDarkMode)
  })

  async function changeDarkMode() {
    chrome.storage.sync.set({ isDark: darkCheckbox.checked })

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: setDarkSlideShow,
    });
  }

  async function changeTheme(element, theme) {
    Array.from(document.getElementsByClassName('theme'))
      .forEach((element) => element.classList.remove('selected'))
    element.classList.add('selected')
  
    chrome.storage.sync.set({ selectedTheme: theme })
  
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: injectTheme,
    });
  }

  // the body of this function must be self contained

  function setDarkSlideShow() {
    chrome.storage.sync.get('isDark', ({ isDark }) => {
      if (isDark) {
        document.body.classList.add('--h-sky-theme-dark')
      } else {
        document.body.classList.remove('--h-sky-theme-dark')
      }
    })
  }
  
  // the body of this function must be self contained
  
  function injectTheme() {
    chrome.storage.sync.get('selectedTheme', ({ selectedTheme: theme }) => {
      const css = theme.name === 'default' ? '' :
      `:root {
        --bg-color: ${theme.bgColor};
        --bg-color-front: ${theme.bgColorFront};
        --bg-color-back: ${theme.bgColorBack};
        --text-color: ${theme.textColor};
        --border-color: ${theme.borderColor};
        --border-bottom-color: ${theme.borderBottomColor};
      }
      
      .block, .menu-items, .dialog, .board, .list, .chat .emoji-list {
        background-color: var(--bg-color-front);
      }
  
      .block, .menu-items, .dialog {
        border: 1px solid var(--bg-color-front);
        border-radius: 6px !important;
      }
  
      .menu-items, .dialog {
        -webkit-box-shadow: 0px 4px 12px 0 rgba(0, 0, 0, 0.45);
        box-shadow: 0px 4px 12px 0 rgba(0, 0, 0, 0.45);
      }
  
      .menu-items li:hover, .list .list-item:hover {
        color: #fff;
        background-color: rgba(255, 255, 255, 0.1);
      }
  
      .list.no-icon .list-item.selected {
        border: none;
        background: var(--bg-color-back);
      }
  
      .menu-items li.separator {
        border-top: 2px groove rgba(255, 255, 255, .1);
      }
  
      .dialog>.dialog-header {
        border-bottom: 2px groove rgba(255, 255, 255, .1);
      }
  
      .entry, .input, input, select, textarea {
        background-color:  var(--bg-color-back);
        border-radius: 4px;
        border: none;
        outline: none;
      }
  
      .chat .commands-box, .chat .commands-box .preview-box {
        background: var(--bg-color-back);
        border-radius: 4px;
      }
  
      .btn, button {
        border-radius: 4px;
      }
  
      .nav .nav-item {
        background-color: rgba(255,255,255,.1);
        border: 1px solid rgba(255,255,255,.3);
      }
  
      .nav .nav-item:hover, .btn-flat:hover {
        background-color: rgba(255,255,255,.2);
        border: 1px solid rgba(255,255,255,.4);
      }
  
      .dropdown .dropdown-toggle:hover {
        background: rgba(255,255,255,.1);
      }
  
      .dropdown .dropdown-toggle:active, .dropdown .dropdown-toggle:focus {
        background: rgba(255,255,255,.2);
      }
  
      header {
        background: var(--bg-color-front);
        border-bottom: 1px solid transparent;
      }
  
      .users .user-row {
        border-radius: 4px;
      }
  
      .users .user-row.focused, .users .user-row:hover {
        background-color: rgba(255, 255, 255, .1);
      }
  
      .table-hover>tbody>tr:hover {
        background-color: rgba(255, 255, 255, .1);
      }
  
      .table-hover>tbody>tr.selected {
        background-color: rgba(255, 255, 255, .2);
      }
  
      .settings .notifications button.checkbox>.icon-off:hover {
        fill: rgba(255, 255, 255, .5);
      }
      
      .settings .notifications button.checkbox>.icon-off {
        fill: rgba(255, 255, 255, .3);
      }
  
      .table>tbody>tr>td, .table>tbody>tr>th, .table>tfoot>tr>td, .table>tfoot>tr>th, .table>thead>tr>td {
        border-bottom: 1px solid rgba(255, 255, 255, .1);
      }
  
      .nav-tabs, .table-condensed>* {
        border-bottom: 1px solid rgba(255, 255, 255, .1);
      }
  
      body ::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, .2) !important;
      }
  
      body ::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, .5) !important;
      }
  
      .chat .chat-msg, .chat .chat-msg .message-commands {
        background-color: var(--bg-color-front);
      }
  
      .chat .chat-msg .message-commands button:hover, .chat .pinned-message button:hover {
        background: rgba(255, 255, 255, .2);
        border-color: transparent;
      }
  
      .board .toolbar button.btn-on, .board .toolbar2 button.btn-on {
        background: rgba(255, 255, 255, .2);
      }
  
      .rtl .chat .chat-msg .quoted-message {
        border-left: none;
        border-right: 3px solid rgba(255, 255, 255, .3);
      }
  
      .chat .chat-msg .quoted-message {
        border-left: 3px solid rgba(255, 255, 255, .3);
        background: rgba(255, 255, 255, .1);
      }
      `;

    const darkCss = `body.--h-sky-theme-dark .slide-wrapper { filter: invert(0.9) hue-rotate(180deg); }`
  
    let style = document.getElementById('--h-sky-theme-style')
    const cssTextNode = document.createTextNode(css + darkCss)

    if (style) {
      style.firstChild.replaceWith(cssTextNode);
    } else {
      style = document.createElement('style');
      style.id = '--h-sky-theme-style';
      style.appendChild(cssTextNode)
      document.body.appendChild(style);
    }
    });
  }
  
  function renderThemeIcon(theme) {
    const svg = `
    <svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="gradient${theme.name}" gradientUnits="objectBoundingBox" x1="50%" y1="0" x2="50.01%" y2="0">
          <stop stop-color="${theme.bgColorFront}" offset="0%"></stop>
          <stop stop-color="${theme.bgColor}" offset="100%"></stop>
        </linearGradient>
      </defs>
      
      <circle class="ring" cx="36" cy="36" r="36"></circle>
      <circle
        fill="url(#gradient${theme.name})"
        stroke="${theme.bgColor}"
        stroke-width="2"
        class="circle" cx="36" cy="36" r="32"></circle>
      
      <g class="checkMark" transform="translate(48.5, 3.5)">
        <circle cx="10" cy="10" r="10"></circle>
        <path d="m 2.9885708,9.99721 5.0109458,4.98792 0.00275,-0.003
          0.024151,0.0227 8.9741604,-9.01557 -1.431323,-1.42476 -7.5742214,7.6092 -3.6031671,-3.58665 z">
        </path>
      </g>
    </svg>
    `
  
    const themeIcon = document.createElement('div')
    themeIcon.innerHTML = svg
    themeIcon.classList.add('theme')
    themeIcon.addEventListener('click', () => changeTheme(themeIcon, theme))
  
    return themeIcon
  }  
})()