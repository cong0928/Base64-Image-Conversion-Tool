// 获取DOM元素
const base64Input = document.getElementById('base64-input');
const convertBtn = document.getElementById('convert-btn');
const previewImage = document.getElementById('preview-image');
const errorMessage = document.getElementById('error-message');

// 新增上传功能DOM元素
const imageUpload = document.getElementById('image-upload');
const uploadPreview = document.getElementById('upload-preview');
const base64Output = document.getElementById('base64-output');

// 转换按钮点击事件
convertBtn.addEventListener('click', () => {
    const base64Text = base64Input.value.trim();
    
    // 清空之前的结果
    previewImage.style.display = 'none';
    errorMessage.style.display = 'none';
    
    if (!base64Text) {
        showError('请输入Base64文本');
        return;
    }
    
    try {
        // 检查是否包含data URL前缀，如果没有则添加默认前缀
        let imageSrc = base64Text;
        if (!imageSrc.startsWith('data:image/')) {
            imageSrc = `data:image/png;base64,${imageSrc}`;
        }
        
        // 设置图片源
        previewImage.src = imageSrc;
        
        // 图片加载成功处理
        previewImage.onload = () => {
            previewImage.style.display = 'block';
        };
        
        // 图片加载失败处理
        previewImage.onerror = () => {
            showError('无效的Base64图片编码，请检查输入');
        };
    } catch (error) {
        showError('处理失败：' + error.message);
    }
});

// 显示错误信息
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

// 新增图片上传处理
imageUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 检查文件类型是否为图片
    if (!file.type.startsWith('image/')) {
        showError('请上传有效的图片文件');
        return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
        // 显示预览图
        uploadPreview.innerHTML = `<img src="${event.target.result}" style="max-width: 100%; max-height: 200px; margin-top: 10px;">`;
        // 显示Base64编码
        base64Output.value = event.target.result;
    };
    reader.onerror = () => {
        showError('图片读取失败，请重试');
    };
    reader.readAsDataURL(file);
});

// 支持粘贴操作
base64Input.addEventListener('paste', (e) => {
    // 粘贴后短暂延迟再自动转换
    setTimeout(() => {
        if (base64Input.value.trim()) {
            convertBtn.click();
        }
    }, 100);
});