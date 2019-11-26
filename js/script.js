$(function () {

    //salva os objetos do DOM como variáveis
    let container = $('#container');

    let biro = $('#biro');
    
    let pole = $('.pole');
    let pole_1 = $('#pole_1');
    let pole_2 = $('#pole_2');
    
    let pole2 = $('.pole2');
    let pole_3 = $('#pole_3');
    let pole_4 = $('#pole_4');
    
    let score = $('#score');
    let velocidade_span = $('#velocidade');
    let restart = $('#restart');

    //define a configuração inicial do jogo
    let container_width = parseInt(container.width());
    let container_height = parseInt(container.height());

    let pole_initial_position = parseInt(pole.css('right'));
    let pole_initial_height = parseInt(pole.css('height'));
    let pole_initial_position2 = parseInt(pole2.css('right'));
    let pole_initial_height2 = parseInt(pole2.css('height'));
    
    let biro_left = parseInt(biro.css('left'));
    let biro_height = parseInt(biro.height());
    
    let velocidade = parseInt(prompt("Qual a velocidade que você deseja começar o jogo?"));;
    while(velocidade <=0 || isNaN(velocidade)){
        velocidade = parseInt(prompt("Não podemos começar com uma velocidade tão baixa assim. Vamos tentar de novo mas agora informando um número maior que zero."));
    }
    let go_up = false;
    let score_updated = false;
    let game_over = false;

    alert("Se prepare que o jogo vai começar!");
    document.getElementById("velocidade").innerHTML = velocidade;

    let the_game = setInterval(function () {

        if (verificaColisoes()) {

            stop_the_game();

        } else {

            let pole_current_position = parseInt(pole.css('right'));
            let pole_current_position2 = parseInt(pole2.css('right'));

            //update the score when the poles have passed the bird successfully
            verificaUltrapassagem(pole_current_position);
            verificaUltrapassagem(pole_current_position2);      

            //check whether the poles went out of the container
            if (verificaPoleForaDoContainer(pole_current_position)) {
                atribuiTamanhoPole(pole_1, pole_2, pole_initial_height);
                calculaVelocidade();
                pole_current_position = pole_initial_position; //quando chega no limite do container volta ao começo           
            }

            if (verificaPoleForaDoContainer(pole_current_position)) {
                atribuiTamanhoPole(pole_3, pole_4, pole_initial_height2);
                calculaVelocidade();
                pole_current_position2 = pole_initial_position2; //quando chega no limite do container volta ao começo
            }

            movimentaPoles(pole, pole_current_position);
            movimentaPoles(pole2, pole_current_position2);
            
            if (go_up === false) {
                go_down();
            }
        }

    }, 40);

    function verificaColisoes(){ //Verifica todas as colisoes 
        if (collision(biro, pole_1) || collision(biro, pole_2) || collision(biro, pole_3) || collision(biro, pole_4) || 
            parseInt(biro.css('top')) <= 0 || parseInt(biro.css('top')) > container_height - biro_height)
            return true;
    }

    function verificaUltrapassagem($pole_current_position){
        if ($pole_current_position > container_width - biro_left){
            if (score_updated === false) {
                score.text(parseInt(score.text()) + 1);
                score_updated = true;
            }
        }
            return true;
    }

    function atribuiTamanhoPole($pole_1, $pole_2, $pole_initial_height){
        let new_height = parseInt(Math.random() * 100);
        $pole_1.css('height', $pole_initial_height + new_height);
        $pole_2.css('height', $pole_initial_height - new_height);
    }

    function calculaVelocidade(){
        velocidade = velocidade + 1;
        velocidade_span.text(velocidade);
        score_updated = false;
    }

    function verificaPoleForaDoContainer($pole_current_position){
        if ($pole_current_position > container_width)
            return true;
    }

    function movimentaPoles($pole, $pole_current_position){
        $pole.css('right', $pole_current_position + velocidade);
    }
    
    $(document).on('keydown', function (e) {
        let key = e.keyCode;
        if (key === 32 && go_up === false && game_over === false) {
            go_up = setInterval(up, 50);
        }
    })

    $(document).on('keyup', function (e) {
        let key = e.keyCode;
        if (key === 32) {
            clearInterval(go_up);
            go_up = false;
        }
    });

    function go_down() {
        biro.css('top', parseInt(biro.css('top')) + 5);
    }

    function up() {
        biro.css('top', parseInt(biro.css('top')) - 10);
    }

    function stop_the_game() {
        clearInterval(the_game);
        game_over = true;
        restart.slideDown();
    }

    restart.click(function () {
        location.reload();
    });

    function collision($div1, $div2) {
        let x1 = $div1.offset().left;
        let y1 = $div1.offset().top;
        let h1 = $div1.outerHeight(true);
        let w1 = $div1.outerWidth(true);
        let b1 = y1 + h1;
        let r1 = x1 + w1;
        let x2 = $div2.offset().left;
        let y2 = $div2.offset().top;
        let h2 = $div2.outerHeight(true);
        let w2 = $div2.outerWidth(true);
        let b2 = y2 + h2;
        let r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }

    var $restart = $('#restart');
    $restart.drawText({
        text: 'Game Over',
        fontFamily: 'cursive',
        fontSize: 40,
        x: 290,
        y: 30,
        fillStyle: 'red',
        strokeWidth: 1
    });

    $restart.drawText({
        text: 'Clique aqui para recomeçar',
        fontFamily: 'cursive',
        fontSize: 20,
        x: 290,
        y: 70,
        fillStyle: 'white',
    });

    $restart.drawPolygon({
        fillStyle: 'red',
        x: 100, y: 40,
        radius: 40,
        sides: 5,
        concavity: 0.5
      });

      $restart.drawPolygon({
        fillStyle: 'red',
        x: 470, y: 40,
        radius: 40,
        sides: 5,
        concavity: 0.5
      });
});
