function formFieldsToHSJSON(obj) {  
    let fieldArray = [];  
    for (let key in obj) {  
        if (obj.hasOwnProperty(key)) {  
            let field = {  
                "name": key,  
                "value": obj[key]  
            };  
            fieldArray.push(field);  
        }  
    }  
    return fieldArray;  
}

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
        if (parts.length == 2){
            return parts.pop().split(";").shift();
        }     
};
function buildHSContext() {
    let hsContext = new Object()
    hsContext.hutk = getCookie('hubspotutk');
    hsContext.pageUri = window.location.href;
    hsContext.pageName = document.title;
    return hsContext
}
function prepareHSFormSubmission(dataForm) {
    var submissionData = new Object()
    submissionData.submittedAt = Date.now()
    submissionData.fields = formFieldsToHSJSON(dataForm)
    submissionData.context = buildHSContext()
    return submissionData
}
async function postData(url = '', dataForm ={}) {
    const response = await fetch(url, {
        method: 'POST', 
        mode: 'cors', 
        cache: 'default',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(dataForm) 
        });
    return response.json() 
}

async function submitHSForm(hsFormURL, dataForm) { 
    maxRetries = 3;
    retryDelay = 1000; 
    let retryCount = 0;  

    while (retryCount < maxRetries) {
        try {
            const data = await postData(hsFormURL, dataForm);
            if (data.inlineMessage) {
                console.log("Inline message:", data.inlineMessage);
            }
            return data;  
        } catch (error) { 
            if (error instanceof TypeError && error.message.includes('Failed to fetch')) {  
                console.log(`Failed to fetch, retrying... (${retryCount + 1}/${maxRetries})`);  
                retryCount++;  
                await new Promise(resolve => setTimeout(resolve, retryDelay)); // 等待一段时间再重试  
            } else {  
                throw error; // 对于其他类型的错误，直接抛出  
            }
        }
    }
    throw new Error(`Failed to submit HS form after ${maxRetries} retries`);
}
function getCurrentDateFormatted() { 
    let now = new Date();  
    let year = now.getFullYear();  
    let month = (now.getMonth() + 1).toString().padStart(2, '0');  
    let day = now.getDate().toString().padStart(2, '0');
    let formattedDate = `${year}-${month}-${day}`;  
    return formattedDate;  
}  
var preferredOrder = ['ZWCAD', 'ZWCAD MFG', 'ZWCAD Viewer', 'ZW3D', 'CADbro', 'ZWCAD Mobile', 'ZWSim']; 

var checkCtyUrl = '/form/Download/checkCty/rand/' + Math.random()

function fetchDownloadUrl(product_id, selectedSystem) {
    var time = new Date().getTime(); 
    var url = '/en/Download/getDownloadUrl/rand/' + time;
    $.post(url, {  
        product_id: product_id,  
        selectedSystem: selectedSystem  
    }, function(data) {  
        setTimeout(function() {  
            location.href = data;  
        }, 500);  
    }).fail(function(jqXHR, textStatus, errorThrown) {  
        console.error("请求失败: " + textStatus, errorThrown);  
    }); 
}