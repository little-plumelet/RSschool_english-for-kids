import './styles/footer.css'
export const myFooter = {

    elements : {
        wrapperFooter : null,
        infoContainer: null, 
        personalReference : null,
        year : null,       
        logoContainer : null,
        logo : null,
        schoolReference : null,

    },

    init() {
        // создаем элементы
        this.elements.wrapperFooter = document.createElement('div');
        this.elements.infoContainer = document.createElement('div');
        this.elements.personalReference = document.createElement('a');
        this.elements.year = document.createElement('p');
        this.elements.year.textContent = "2020";
        this.elements.logoContainer = document.createElement('div');
        this.elements.logo = document.createElement('img');
        this.elements.schoolReference = document.createElement('a');
        
        //добавляем классы и атрибуты
        this.elements.wrapperFooter.classList.add('wrapper');
        this.elements.infoContainer.classList.add('info-container');
        this.elements.personalReference.classList.add('personal-reference');
        this.elements.personalReference.setAttribute('href', 'https://github.com/little-plumelet');
       
        this.elements.year.classList.add('year');
        
        this.elements.logoContainer.classList.add('logo-container');
        this.elements.logo.classList.add('logo');
        this.elements.schoolReference.classList.add('school-reference');
        this.elements.schoolReference.setAttribute('href', 'https://rs.school/js/');
        this.elements.logo.setAttribute('src', 'https://rs.school/images/rs_school_js.svg');

        //добавляем внутреннее наполнение
        this.elements.schoolReference.innerHTML = 'Курс «JavaScript/Front-end»';
        this.elements.personalReference.innerHTML = `Little-plumelet. GitHub. <p> Wellcome </p>`;
        // добавляем элементы в DOM
        const footerContent = document.querySelector('footer');

        footerContent.appendChild(this.elements.wrapperFooter);
        this.elements.wrapperFooter.appendChild(this.elements.infoContainer);
        this.elements.wrapperFooter.appendChild(this.elements.logoContainer);
        this.elements.infoContainer.appendChild(this.elements.personalReference);
        this.elements.infoContainer.appendChild(this.elements.year);
        this.elements.logoContainer.appendChild(this.elements.logo);
        this.elements.logoContainer.appendChild(this.elements.schoolReference);
    },
}