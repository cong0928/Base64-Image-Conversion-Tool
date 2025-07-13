// 获取DOM元素
const imageUpload = document.getElementById('image-upload');
const uploadPreview = document.getElementById('upload-preview');
const base64Output = document.getElementById('base64-output');
const errorMessage = document.getElementById('error-message');
// 新增复制功能元素
const copyBtn = document.getElementById('copy-btn');
const copyMessage = document.getElementById('copy-message');

// 显示错误信息
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

// 图片上传处理
imageUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 清空之前的结果
    uploadPreview.innerHTML = '';
    errorMessage.style.display = 'none';

    // 检查文件类型是否为图片
    if (!file.type.startsWith('image/')) {
        showError('请上传有效的图片文件');
        return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
        // 创建预览图
        const img = document.createElement('img');
        img.src = event.target.result;
        img.style.maxWidth = '100%';
        img.style.maxHeight = '200px';
        img.style.marginTop = '10px';
        uploadPreview.appendChild(img);

        // 显示Base64编码
        base64Output.value = event.target.result;
    };
    reader.onerror = () => {
        showError('图片读取失败，请重试');
    };
    reader.readAsDataURL(file);
});

// 新增复制按钮点击事件
copyBtn.addEventListener('click', () => {
    const base64Text = base64Output.value.trim();
    
    if (!base64Text) {
        showError('没有可复制的内容');
        return;
    }
    
    try {
        // 使用Clipboard API复制文本
        navigator.clipboard.writeText(base64Text).then(() => {
            // 显示复制成功消息
            copyMessage.textContent = '复制成功！';
            copyMessage.style.display = 'block';
            
            // 2秒后隐藏消息
            setTimeout(() => {
                copyMessage.style.display = 'none';
            }, 2000);
        }).catch(err => {
            showError('复制失败: ' + err.message);
        });
    } catch (error) {
        showError('复制功能出错: ' + error.message);
    }
});