const urlParams = new URLSearchParams(window.location.search);
        document.getElementById('role').value = urlParams.get('rol');