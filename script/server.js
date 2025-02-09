<script>
  const form = document.getElementById('chatForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = document.getElementById('message').value;
    const responseElem = document.getElementById('response');

    try {
      const res = await fetch('http://localhost:3000/append', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Server error:', errorText);
        responseElem.textContent = 'Server error: ' + errorText;
        return;
      }
      
      const text = await res.text();
      responseElem.textContent = text;
    } catch (error) {
      console.error('Fetch error:', error);
      responseElem.textContent = 'Error sending message: ' + error.message;
    }
  });
</script>
