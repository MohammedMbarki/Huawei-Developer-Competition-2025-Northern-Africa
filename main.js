
const project_id=0;
const authToken=0;
const face_set_name="MOCK"; //To set later on
        // Create floating particles
        function createParticles() {
            const container = document.getElementById('particles');
            
            for (let i = 0; i < 25; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                const size = Math.random() * 8 + 4;
                const left = Math.random() * 100;
                const top = Math.random() * 100;
                const duration = Math.random() * 20 + 20;
                const delay = Math.random() * 10;
                
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${left}%`;
                particle.style.top = `${top}%`;
                particle.style.animationDuration = `${duration}s`;
                particle.style.animationDelay = `-${delay}s`;
                
                // Random color variation - now in blue theme
                const colors = ['#14B8A6', '#0EA5E9', '#0D9488', '#38BDF8'];
                const color = colors[Math.floor(Math.random() * colors.length)];
                particle.style.background = color;
                
                container.appendChild(particle);
            }
        }

        // Create floating elements in hero
        function createFloatingElements() {
            const container = document.getElementById('floatingElements');
            
            for (let i = 0; i < 8; i++) {
                const element = document.createElement('div');
                element.className = 'floating-element';
                
                const size = Math.random() * 100 + 50;
                const left = Math.random() * 100;
                const top = Math.random() * 100;
                const duration = Math.random() * 15 + 15;
                const delay = Math.random() * 10;
                
                element.style.width = `${size}px`;
                element.style.height = `${size}px`;
                element.style.left = `${left}%`;
                element.style.top = `${top}%`;
                element.style.animationDuration = `${duration}s`;
                element.style.animationDelay = `-${delay}s`;
                
                // Random color variation - now in blue theme
                const colors = ['#14B8A6', '#0EA5E9', '#0D9488'];
                const color = colors[Math.floor(Math.random() * colors.length)];
                element.style.background = color;
                
                container.appendChild(element);
            }
        }

        // Theme Toggle
        const themeToggle = document.getElementById('themeToggle');
        const floatingThemeToggle = document.getElementById('floatingThemeToggle');
        const body = document.body;

        function toggleTheme() {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            body.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            body.setAttribute('data-theme', newTheme);
            
            // Update the icon
            const sunIcon = document.querySelector('.sun-icon');
            if (newTheme === 'dark') {
                sunIcon.innerHTML = `
                    <i class="fas fa-moon" style="font-size: 20px;"></i>
                `;
            } else {
                sunIcon.innerHTML = `
                    <div class="sun-core"></div>
                    <div class="sun-ray"></div>
                    <div class="sun-ray"></div>
                    <div class="sun-ray"></div>
                    <div class="sun-ray"></div>
                    <div class="sun-ray"></div>
                    <div class="sun-ray"></div>
                    <div class="sun-ray"></div>
                    <div class="sun-ray"></div>
                `;
            }
            
            setTimeout(() => {
                body.style.transition = '';
            }, 400);
        }

        themeToggle.addEventListener('click', toggleTheme);
        floatingThemeToggle.addEventListener('click', toggleTheme);

        // DOM Elements and functionality
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');
        const imagePreview = document.getElementById('imagePreview');
        const previewContainer = document.getElementById('previewContainer');
        const recognizeBtn = document.getElementById('recognizeBtn');
        const resetBtn = document.getElementById('resetBtn');
        const resultsContainer = document.getElementById('resultsContainer');
        const loadingIndicator = document.getElementById('loadingIndicator');
        const contactForm = document.getElementById('contactForm');

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            createParticles();
            createFloatingElements();
            
            // Header scroll effect
            window.addEventListener('scroll', () => {
                const header = document.querySelector('.header');
                header.classList.toggle('scrolled', window.scrollY > 50);
            });

            // Event listeners
            uploadArea.addEventListener('click', () => fileInput.click());
            fileInput.addEventListener('change', handleFileSelect);
            recognizeBtn.addEventListener('click', recognizeStudent);
            resetBtn.addEventListener('click', resetAll);
            contactForm.addEventListener('submit', handleContactForm);
            setupDragAndDrop();
        });

        function handleFileSelect(event) {
            const file = event.target.files[0];
            if (file) {
                // Check if file is an image
                if (!file.type.startsWith('image/')) {
                    alert('Please upload an image file (JPG, PNG)');
                    return;
                }
                
                const reader = new FileReader();
                reader.onload = function(e) {
                    imagePreview.src = e.target.result;
                    previewContainer.style.display = 'block';
                    updateResultsMessage('Photo ready for recognition. Click "Recognize Student" to continue.');
                };
                reader.readAsDataURL(file);
            }
        }

        function setupDragAndDrop() {
            ['dragover', 'dragenter'].forEach(event => {
                uploadArea.addEventListener(event, (e) => {
                    e.preventDefault();
                    uploadArea.classList.add('dragover');
                });
            });

            ['dragleave', 'dragend', 'drop'].forEach(event => {
                uploadArea.addEventListener(event, (e) => {
                    e.preventDefault();
                    uploadArea.classList.remove('dragover');
                });
            });

            uploadArea.addEventListener('drop', (e) => {
                const file = e.dataTransfer.files[0];
                if (file) {
                    fileInput.files = e.dataTransfer.files;
                    fileInput.dispatchEvent(new Event('change'));
                }
            });
        }

        function recognizeStudent() {
            if (!fileInput.files[0]) {
                alert('Please upload a student photo first!');
                return;
            }

            loadingIndicator.style.display = 'block';
            updateResultsMessage('');

            // Simulate recognition process with a delay
            setTimeout(() => {
                loadingIndicator.style.display = 'none';
                const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const base64Image = e.target.result.split(',')[1];
        
        displayStudentInfo(base64Image)
            .catch(error => {
                console.error("Recognition error:", error);
                loadingIndicator.style.display = 'none';
                updateResultsMessage('An error occurred during recognition. Please try again.');
            });
    };
    
    // Convertir le fichier en Base64
    reader.readAsDataURL(file);
            }, 2000);
        }

        async function displayStudentInfo(image64) {
            const baseUrl = `https://face.ap-southeast-1.myhuaweicloud.com/v2/${project_id}`;
    const url = `${baseUrl}/face-sets/${face_set_name}/search`;

    const headers = { 
        'X-Auth-Token': authToken,
        'Content-Type': 'application/json' 
    };

    const payload = {
        "image_base64": image64,
        "top_n": 1,
        "return_fields": ["id","name","grade","class","dob","parent","contact","adress","image"]
    };

        const r = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload)
        });

        if (!r.ok) {
            alert("error try later !");
            return;
        }

        const data = await r.json();
        
        
        const top_face = data.faces[0];

            const randomStudent =  top_face.external_fields //NOT RANDOM but i don't want break the code
            const confidence = top_face.similarity  
            
            const studentHTML = `
                <div class="student-card">
                    <img src="${randomStudent.image}" alt="${randomStudent.name}" class="student-image">
                    <h2 class="student-name">${randomStudent.name}</h2>
                    <div class="student-id">${randomStudent.id}</div>
                    
                    <div class="confidence-indicator">
                        <div class="confidence-label">
                            <span>Recognition Confidence</span>
                            <span class="confidence-value">${confidence}%</span>
                        </div>
                        <div class="confidence-bar">
                            <div class="confidence-fill" style="width: ${confidence}%"></div>
                        </div>
                    </div>
                    
                    <div class="student-details">
                        <div class="detail-item">
                            <div class="detail-label">Grade</div>
                            <div class="detail-value">${randomStudent.grade}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Class</div>
                            <div class="detail-value">${randomStudent.class}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Date of Birth</div>
                            <div class="detail-value">${randomStudent.dob}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Parent/Guardian</div>
                            <div class="detail-value">${randomStudent.parent}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Contact</div>
                            <div class="detail-value">${randomStudent.contact}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Address</div>
                            <div class="detail-value">${randomStudent.address}</div>
                        </div>
                    </div>
                </div>
            `;
            
            resultsContainer.innerHTML = studentHTML;
            
            // Animate the confidence bar
            setTimeout(() => {
                const confidenceFill = document.querySelector('.confidence-fill');
                confidenceFill.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
            }, 100);
        }

        function updateResultsMessage(message) {
            if (!message) {
                resultsContainer.innerHTML = '';
                return;
            }
            resultsContainer.innerHTML = `
                <div style="text-align: center; padding: 3rem 2rem; color: var(--text-secondary);">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">📸</div>
                    <p style="font-size: 1rem;">${message}</p>
                </div>
            `;
        }

        function resetAll() {
            fileInput.value = '';
            imagePreview.src = '';
            previewContainer.style.display = 'none';
            loadingIndicator.style.display = 'none';
            updateResultsMessage('Upload a student photo to identify them and view their information');
        }

        function handleContactForm(event) {
            event.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        }

