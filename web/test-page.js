const http = require('http');

http.get('http://localhost:3000/docs/01_AI/01_Agent%E5%9F%BA%E7%A1%80', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const hasError = data.includes('内容未找到');
    const hasContent = data.includes('Agent基础核心问答');
    console.log('Has error:', hasError);
    console.log('Has content:', hasContent);
    console.log('Status:', res.statusCode);
    if (hasContent) {
      console.log('✅ Page is working correctly');
    } else {
      console.log('❌ Page still showing error');
    }
  });
});
