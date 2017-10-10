class NegociacaoService{

    constructor(){
        this._http = new HttpService();
    }

    obterNegociacoesDaSemana(){
        return  this._http
                    .get('negociacoes/semana')
                    .then(negociacoes => {
                        console.log(negociacoes);

                        return negociacoes.map(objeto=> new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
                    })
                    .catch(erro=>{
                        console.log(erro)
                        throw new Error('Não foi possível obter as negociações da semana.')
                    })        
    }

    obterNegociacoesDaSemanaRetrasada(){

        return  this._http
                    .get('negociacoes/retrasada')
                    .then(negociacoes => {
                        console.log(negociacoes);

                        return negociacoes.map(objeto=> new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
                    })
                    .catch(erro=>{
                        console.log(erro)
                        throw new Error('Não foi possível obter as negociações da semana retrasada.')
                    })        

    }

    obterNegociacoesDaSemanaAnterior(){

        return  this._http
                    .get('negociacoes/anterior')
                    .then(negociacoes => {
                        console.log(negociacoes);

                        return negociacoes.map(objeto=> new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
                    })
                    .catch(erro=>{
                        console.log(erro)
                        throw new Error('Não foi possível obter as negociações da semana anterior.')
                    })        
    }

     obterNegociacoesDaSemanaAnterior(){

        return  this._http
                    .get('negociacoes/anterior')
                    .then(negociacoes => {
                        console.log(negociacoes);

                        return negociacoes.map(objeto=> new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
                    })
                    .catch(erro=>{
                        console.log(erro)
                        throw new Error('Não foi possível obter as negociações da semana anterior.')
                    })        
    }
    
    addNegociacao(negociacao){
                return  this._http
                            .post('/negociacoes', negociacao)
                            .then(() => {
                                console.log('negociação adicionada com sucesso!')
                            })
                            .catch(erro=>{
                                console.log(erro)
                                throw new Error('Não foi possível adicionar a negociação.')
                            })        
    }

    obterNegociacoes(){
        return Promise.all([
                this.obterNegociacoesDaSemana(), 
                this.obterNegociacoesDaSemanaAnterior(), 
                this.obterNegociacoesDaSemanaRetrasada()
            ]).then(periodos =>{
                let negociacoes = periodos
                    .reduce((dados, periodo)=> dados.concat(periodo), []);
                return negociacoes;
            }).catch(erro =>{
                throw new Error(erro);
            });
    }
}