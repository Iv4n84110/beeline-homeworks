const text = document.querySelector('.text');

const fetchStart = () => {
    fetch('/serviceavailable/')
        .then(resp => resp.json())
        .then(
            resp => {
                if (resp.isSuccess) {
                    Promise.allSettled([
                        fetch('/getinfo/').then(resp => resp.json()),
                        fetch('/getdescription/').then(resp => resp.json()),
                    ])
                        .then(results => {
                            text.innerHTML = '';
                            let isEmpty = true;
                            isOk = (resp) => {
                                if (resp.status === "fulfilled") {
                                    if (resp.value.isSuccess === true) {
                                        text.innerHTML += resp.value.text + '\n'
                                        isEmpty = false;
                                    }
                                }
                            }
                            results.forEach(isOk)
                            if (isEmpty) {
                                return (Promise.reject())
                            }
                        })
                        .catch(() => console.log('Server Error'))
                }
                else return (Promise.reject())
            })
        .catch(() => text.innerHTML = 'Server Error')
};




