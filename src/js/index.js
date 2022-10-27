var file = ''
var filecode = ''
var filetype = ''
var filex = ''
var data
var status
var folderico
var filea = 0
window.token = "wow"

var path = "/"
var num = 0
function f5(){
    num = 0
    var file = ''
    var filecode = ''
    var filetype = ''
    var filex = ''
    $("#loader").fadeIn()
    
    $("#files").fadeOut()
    $("#files").empty()

    folderico = {
        "file":`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-file-earmark" viewBox="0 0 16 16">\
        <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
        </svg>`,
        "folder":`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-folder" viewBox="0 0 16 16">
        <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z"/>
        </svg>`
        
    }

    try{
        $.getJSON("http://127.0.0.1:5000/token/"+window.token+"?path="+path,function(data,status){  
        var files = data["files"]
        if(status=="success"){
            files.forEach(function(file){

                var filename = file["filename"]

                filecode = `\
                \<h3 id="fileshower" ><button type="button" filename="${filename}" class="fileshower-btn btn btn-light" >
                \ &nbsp;${folderico[file["filetype"]]}
                \ &nbsp;${filename}
                \</button></h3>
                \ `
                filex = filex+filecode
                
            })
            var filename = path.split("/")
            $("#pathbar").empty()
            filename.forEach(function(filename){
                
                var pathbar_code = `\
                \<a id="${filename}" class="path-btn btn btn-light">${filename}</a>
                \>
                `
                if(filename==""){

                }else{
                    $("#pathbar").append(pathbar_code)
                }
                
            })

            $("#files").append(filex)
        }
    })
    }catch(ERR_CONNECTION_REFUSED){
        console.log("err")
    }
    
    $("#loader").fadeOut()
    $("#files").fadeIn()

}

function clicknext(){

}

function click(){
    $("#files").ajax(
        "/token/"+window.to
    )
}
$(document).on("dblclick",".fileshower-btn",function(){
    filename = $(this).attr("filename")
    console.log(path)
    if(path == "/"){
        path = path+filename
    }else{
        path = path+"/"+filename
    }  
    f5()
})
$(document).on("click",".fileshower-btn",function(){
    $(this).siblings().attr("class","fileshower-btn btn btn-light")
    var get=$(this).attr("class")
    console.log(get)
    if(get == "fileshower-btn btn btn-info"){
        $(this).attr("class","fileshower-btn btn btn-light")

    }else{
        $(this).attr("class","fileshower-btn btn btn-info")
    }
})
$(document).on("click",".path-btn",function(){
    filename = $(this).attr("filename")

})
function newfile() {

    var fn = document.forms["newFile"]["filename"].value;
    if(fn == ""){
        errinfo = `
        <div class="alert alert-danger alert-dismissible" id="error">
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        <strong>Error!</strong> An invalid input.
        </div>`
        $("#info").append(errinfo)
        return false;
    }else{
        return false;
    }
}
$(document).on("click","#arrow-up",function(){
    var num = path.lastIndexOf("/")
    path = path.substring(0,num)
    if(num==1){
        path="/"
    }
    console.log(num)
    console.log(path)
    f5()
})