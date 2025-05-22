let projects = {
    'introducere': 'https://www.jdoodle.com/embed/v1/26458a16a1103b96',
    'oglindit': 'https://www.jdoodle.com/embed/v1/7bf6fc2af499c8d4',
    'functie': 'https://www.jdoodle.com/embed/v1/ac2081efb2f7300a',
    'introducere-en':'https://www.jdoodle.com/embed/v1/3601edeef9500f60',
    'oglindit-en':'https://www.jdoodle.com/embed/v1/dd2770a9406f0630',
    'functie-en':'https://www.jdoodle.com/embed/v1/fdef62c77af615a'
};

function loadProject(project) {
    let body = document.getElementById('project-body'); 

    let div = document.createElement('div');
    div.setAttribute('data-pym-src', project);

    let script = document.createElement('script');
    script.src = "https://www.jdoodle.com/assets/jdoodle-pym.min.js";
    script.type = "text/javascript";

    body.appendChild(div);
    body.appendChild(script);

}

const urlParams = new URLSearchParams(window.location.search);
const paramValue = urlParams.get('project');

loadProject(projects[paramValue]);

