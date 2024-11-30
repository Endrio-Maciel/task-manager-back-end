# Backend

- O backend foi desenvolvido em Node.js utilizando Prisma como ORM e Fastify como framework web. Ele é responsável pela manipulação dos dados e fornecimento de uma API RESTful para interação com o frontend.

# Funções

-  Listagem de Tarefas:

Retorna todas as tarefas armazenadas no banco de dados, ordenadas pelo campo ordem (campo numérico de ordem de apresentação).
Tarefas com custo maior ou igual a R$1.000,00 devem ser destacadas com um fundo amarelo (essa lógica será aplicada no frontend).

- Incluir Tarefa:

Permite incluir uma nova tarefa com os campos Nome da Tarefa, Custo e Data Limite.
A tarefa será criada com a ordem de apresentação no final da lista (o maior número).

- Editar Tarefa:

Permite editar os campos Nome da Tarefa, Custo e Data Limite de uma tarefa existente.
Verifica se o novo nome da tarefa já existe no banco de dados. Caso positivo, a alteração não é permitida.

- Excluir Tarefa:

Permite excluir uma tarefa com base no seu ID.

- Subir Tarefa

Permite editar o campo de ordem da tarefa para a tarefa superior, não é possivel subir uma tarefa que esta no inicio

- Descer Tarefa

Permite editar o campo de ordem da tarefa para a tarefa inferior, não é possivel descer uma tarefa que esta no final
