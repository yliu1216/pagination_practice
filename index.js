fetch("./data.json")
    .then(response => response.json())
    .then(data => {
        // Get the container element
        const container = document.querySelector('.container');

        const itemsPerPage = 20;
        let currentPage = 1;
        function showData() {
                const startIndex = (currentPage-1) * itemsPerPage;
                const endIndex = startIndex + itemsPerPage;
                const pageItems = data.slice(startIndex, endIndex);
                //create an ol element in the container
                const olElement = document.createElement('ol');
                //use forEach loop to iterate over the elements
                pageItems.forEach(item=>{
                    // Create the li element
                    const liElement = document.createElement('li');
                    // add data to the container
                    liElement.innerHTML = `this is User ${item.userId}, ordered item ${item.id}, ${item.title}`;
                    olElement.appendChild(liElement);
                });
                container.innerHTML = '';
                container.appendChild(olElement);

                //create pre buttons
                const preButton = document.createElement('button');
                preButton.textContent = "Prev";
                preButton.addEventListener('click', ()=>{
                    if(currentPage>1){
                        gotoPage(currentPage-1);
                      }
                    });
                container.appendChild(preButton);

                //create page buttons
                const pages = Math.ceil(data.length / itemsPerPage);
                for(let i=0; i<pages; i++){
                    const pageButtons = document.createElement('button');
                    pageButtons.textContent = `${i+1}`;
                    pageButtons.addEventListener('click',()=>{
                        gotoPage(i+1);
                    });
                    container.appendChild(pageButtons);
                }

                //create next buttons
                const nextButton = document.createElement('button');
                nextButton.textContent = "Next";
                nextButton.addEventListener('click', ()=>{
                    if(currentPage<Math.ceil(data.length/itemsPerPage)){
                        gotoPage(currentPage+1);
                    }
                });
                
                container.appendChild(nextButton);

        }

        showData();

        function gotoPage(page){
            currentPage = page;
            showData();
        }

        
    })
    .catch(error => console.error('Error fetching data:', error));

