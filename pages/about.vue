<template>
    <div class="container mx-auto px-4 py-12">
      <h1 class="text-4xl font-bold mb-8">Sobre a JUMI</h1>
  
      <div class="grid md:grid-cols-2 gap-12">
        <div class="space-y-6">
          <section>
            <h2 class="text-2xl font-bold mb-4">Quem Somos</h2>
            <p class="text-gray-600">
              A JUMI - Jovens Unidos por Manique do Intendente é uma associação juvenil dedicada 
              a promover a cultura e o desenvolvimento da nossa comunidade através do envolvimento 
              ativo dos jovens.
            </p>
          </section>
  
          <section>
            <h2 class="text-2xl font-bold mb-4">Nossa Missão</h2>
            <p class="text-gray-600">
              Trabalhar em prol da juventude e da comunidade, promovendo eventos culturais, 
              atividades recreativas e iniciativas educacionais que contribuam para o 
              desenvolvimento pessoal e social dos jovens de Manique do Intendente.
            </p>
          </section>
  
          <section>
            <h2 class="text-2xl font-bold mb-4">Nossos Valores</h2>
            <ul class="list-disc list-inside text-gray-600 space-y-2">
              <li>Compromisso com a comunidade</li>
              <li>Desenvolvimento cultural</li>
              <li>Inclusão e participação</li>
              <li>Inovação e criatividade</li>
              <li>Sustentabilidade</li>
            </ul>
          </section>
        </div>
  
        <div class="space-y-6">
          <img
    src="https://placehold.co/600x400"
    alt="JUMI Team"
    class="rounded-lg shadow-md w-full h-64 object-cover"
  />
  
          <section>
            <h2 class="text-2xl font-bold mb-4">Nossa História</h2>
            <p class="text-gray-600">
              Fundada em [ANO], a JUMI nasceu da vontade de um grupo de jovens 
              empenhados em fazer a diferença na sua comunidade. Desde então, 
              temos vindo a crescer e a desenvolver diversos projetos que impactam 
              positivamente a vida em Manique do Intendente.
            </p>
          </section>
  
          <section>
            <h2 class="text-2xl font-bold mb-4">Junte-se a Nós</h2>
            <p class="text-gray-600 mb-4">
              Estamos sempre à procura de novos membros que queiram contribuir para 
              a nossa missão.
            </p>
            <NuxtLink
              to="/contact"
              class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Contacte-nos
            </NuxtLink>
          </section>
        </div>
      </div>
    </div>
  </template>