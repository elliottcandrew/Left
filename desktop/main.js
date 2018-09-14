const {app, BrowserWindow, webFrame, Menu, dialog} = require('electron')
const path = require('path')
const url = require('url')
const shell = require('electron').shell;

let is_shown = true;

app.on('ready', () => 
{
  app.win = new BrowserWindow({
    width: 880, 
    height: 530, 
    backgroundColor:"#000", 
    minWidth: 587, 
    minHeight: 540, 
    frame:false, 
    autoHideMenuBar: true, 
    icon: __dirname + '/icon.ico'
  });

  app.win.loadURL(`file://${__dirname}/sources/index.html`)
  // app.inspect();
  
  app.win.on('closed', () => {
    win = null
    app.quit()
  })

  app.win.on('hide', () => {
    is_shown = false;
  })

  app.win.on('show', () => {
    is_shown = true;
  })

  app.on('window-all-closed', () => {
    app.quit()
  })

  app.on('activate', () => {
    if(app.win === null){
      createWindow()
    }
    else{
      app.win.show();
    }
  })
})

// Helpers

app.inspect = function()
{
  app.win.toggleDevTools();
}

app.toggle_fullscreen = function()
{
  app.win.setFullScreen(app.win.isFullScreen() ? false : true);
}

app.toggle_visible = function()
{
  if(process.platform == "win32"){
    if(!app.win.isMinimized()){ app.win.minimize(); } else{ app.win.restore(); }
  }
  else{
    if(is_shown && !app.win.isFullScreen()){ app.win.hide(); } else{ app.win.show(); }
  }
}

app.inject_menu = function(menu)
{
  try{
    Menu.setApplicationMenu(Menu.buildFromTemplate(menu));
  }
  catch(err){
    console.warn("Cannot inject menu.")
  }  
}

app.path = function()
{
  return __dirname
}