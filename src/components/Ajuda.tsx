import Accordion from '../components/Accordion';
import "../css/Ajuda.css"
import Footer from '../components/Footer';

import comoAcessarIndicadoresGif from '../assets/gifs/como-acessar-indicadores.gif';
import acessarNavbarGif from '../assets/gifs/acessar-navbar.gif';
import dashboard1Gif from '../assets/gifs/dashboard1.gif';
import dashboard2Gif from '../assets/gifs/dashboard2.gif';
import filtros1Gif from '../assets/gifs/filtros-1.gif';
import filtros2Gif from '../assets/gifs/filtros-2.gif';
import filtros3Gif from '../assets/gifs/filtros-3.gif';
import detalhesGraficosGif from '../assets/gifs/detalhes-graficos.gif';
import detalhesProcuraGif from '../assets/gifs/detalhes-procura.gif';
import downloadGraficoGif from '../assets/gifs/download-grafico.gif';
import downloadPaginaGif from '../assets/gifs/download-pagina.gif';
import downloadCsvGif from '../assets/gifs/download-csv.gif';
import sobreGif from '../assets/gifs/sobre.gif';

const Ajuda: React.FC = () => {
  const accordionItems = [
    {
      title: 'Como acessar os indicadores',
      content: (
        <div>
          <p>Na página inicial, identifique o botão azul de acesso aos indicadores. Você será redirecionado para a página da Dashboard automaticamente.</p>
          <img src={comoAcessarIndicadoresGif} alt='Vídeo de demonstração da operação descrita acima' width="840" height="auto"></img>
          <p>Note que você também pode acessar a Dashboard clicando no terceiro elemento da barra horizontal no topo da página, onde está escrito "Dashboard". </p>
          <img src={acessarNavbarGif} alt='Vídeo de demonstração da operação descrita acima' width="840" height="auto"></img>
        </div>
      ),
    },
    {
      title: 'Como visualizar a dashboard',
      content: (
        <div>
          <p>Na página da Dashboard, navegue para baixo observando os gráficos apresentados a esquerda.</p>
          <img src={dashboard1Gif} alt='Vídeo de demonstração da operação descrita acima' width="840" height="auto"></img>
          <p>Para ampliar a visualização de um dado, identifique o gráfico desejado e selecione o icone de quatro flechas encontrado no canto inferior esquerdo.</p>
          <img src={dashboard2Gif} alt='Vídeo de demonstração da operação descrita acima' width="840" height="auto"></img>
        </div>
      ),
    },
    {
      title: 'Como utilizar os filtros',
      content: (
        <div>
          <p>Na página da Dashboard, no canto direito, identifique o menu flutuante de filtragem. Selecione o filtro desejado entre as sete categorias: Área de Conhecimento, Área Temática, Linha Temática, Modalidade, Situação, Campus ou Ano. Um menu suspenso se abrirá, onde é possível selecionar dentre as diversas opções de filtragem.</p>
          <img src={filtros1Gif} alt='Vídeo de demonstração da operação descrita acima' width="840" height="auto"></img>
          <p>Os filtros escolhidos serão automaticamente aplicados aos gráficos e dados apresentados na interface de indicadores de extensão universitária. Note que é possível selecionar mais de uma opção de filtragem simultaneamente.</p>
          <img src={filtros2Gif} alt='Vídeo de demonstração da operação descrita acima' width="840" height="auto"></img>
          <p>Também é possível retirar um filtro aplicado clicando no ícone de "x" no canto superior do menu de filtragem. Para retirar todos os filtros aplicados, aperte o botão vermelho "Limpar Filtros".</p>
          <img src={filtros3Gif} alt='Vídeo de demonstração da operação descrita acima' width="840" height="auto"></img>
        </div>
      ),
    },
    {
      title: 'Como acessar detalhes sobre um gráfico',
      content: (
        <div>
          <p>Na página da Dashboard, identifique o gráfico desejado. No canto superior direito do gráfico, clique no ícone de três pontos. Na lista suspensa aberta, clique na opção “Ver detalhes”. Um painel com informações e detalhes específicos sobre os itens filtrados aparecerá.</p>
          <img src={detalhesGraficosGif} alt='Vídeo de demonstração da operação descrita acima' width="840" height="auto"></img>
          <p>Você pode encontrar mais informações sobre um item específico clicando na barra de pesquisa e inserindo o título de uma ação extencionista.</p>
          <img src={detalhesProcuraGif} alt='Vídeo de demonstração da operação descrita acima' width="840" height="auto"></img>
        </div>
      ),
    },
    {
      title: 'Como fazer download de um gráfico',
      content: (
        <div>
          <p>Na página da Dashboard, identifique o gráfico desejado. No canto superior direito do gráfico, clique no ícone de três pontos. Na lista suspensa aberta, clique na opção “Download”, selecionando o formato de imagem preferido. O download deve começar imediatamente.</p>
          <img src={downloadGraficoGif} alt='Vídeo de demonstração da operação descrita acima' width="840" height="auto"></img>
        </div>
      ),
    },
    {
      title: 'Como fazer download de todos os gráficos',
      content: (
        <div>
          <p>Na página da Dashboard, identifique e clique no botão de download azul no canto superior esquerdo da tela. O download deve começar imediatamente. Note que o donwload de todos os gráficos só está disponível no formato .PDF.</p>
          <img src={downloadPaginaGif} alt='Vídeo de demonstração da operação descrita acima' width="840" height="auto"></img>
        </div>
      ),
    },
    {
      title: 'Como fazer download do .CSV',
      content: (
        <div>
          <p>Na página da Dashboard, identifique o gráfico desejado. No canto superior direito do gráfico, clique no ícone de três pontos. Na lista suspensa aberta, clique na opção “Ver detalhes”. Dentro do painel de detalhes, clique no botão verde de download do csv. O download deve começar imediatamente.</p>
          <img src={downloadCsvGif} alt='Vídeo de demonstração da operação descrita acima' width="840" height="auto"></img>
        </div>
      ),
    },
    {
      title: 'Como saber mais sobre o desenvolvimento do sistema',
      content: (
        <div>
          <p>Clique no quarto elemento da barra horizontal no topo da página, onde está escrito "Sobre". Navegue para baixo, visualizando as informações sobre o sistema, seu objetivo, desenvolvimento e equipe responsável.</p>
          <img src={sobreGif} alt='Vídeo de demonstração da operação descrita acima' width="840" height="auto"></img>
        </div>
      ),
    },
  ];

  return (
    <div className="pagina-ajuda">
      <div className="ajuda-header-container">
        <div className="ajuda-header-bg">
          <svg width="100%" height="100%" viewBox="0 0 1440 300" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M180 0 V 100 Q 180 150 130 150 H 100 Q 80 150 80 130 Q 80 110 100 110 H 130 Q 150 110 150 80 V 0" fill="#E74B23" transform="translate(-50, 20)" />
            <path d="M1260 0 V 120 Q 1260 180 1200 180 H 1150 Q 1120 180 1120 150 Q 1120 120 1150 120 H 1200 Q 1230 120 1230 90 V 0" fill="#FFC107" transform="translate(50, 0)" />
            <path d="M0 250 Q 50 250 80 280 L 150 300 H 0 V 250" fill="#155BD8" transform="translate(0, 20)" />
            <path d="M1440 280 Q 1400 280 1380 300 H 1440 V 280" fill="#2E3192" />
          </svg>
        </div>
        <div className="ajuda-header-box">
          <h1 className="ajuda-title">COMO USAR O SISTEMA</h1>
          <div className="corner-dec-top-right">
            <div className="bar-blue-tr"></div>
            <div className="bar-yellow-tr"></div>
            <div className="bar-red-tr"></div>
          </div>
          <div className="corner-dec-bottom-left">
            <div className="bar-red-bl"></div>
            <div className="bar-yellow-bl"></div>
            <div className="bar-blue-bl"></div>
          </div>
        </div>
        <p className="ajuda-subtitle">
          Saiba como usar todas as funcionalidades desta ferramenta
        </p>
      </div>
      <div className="container-ajuda">
        <Accordion items={accordionItems} />
      </div>
      <Footer />
    </div>
  )
}

export default Ajuda