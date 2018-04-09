DROP DATABASE IF EXISTS testManager;
CREATE DATABASE testManager;
use testManager;

CREATE TABLE disciplines(
    id int unsigned not null auto_increment,
    title VARCHAR(100) not null,

    CONSTRAINT pk_disciplines PRIMARY KEY(id)
);
CREATE TABLE lessons (
    id int unsigned not null auto_increment,
    title VARCHAR(100) not null,
    id_discipline int unsigned not null,

    CONSTRAINT pk_lessons PRIMARY KEY (id),
    CONSTRAINT fk_lessons_discipline FOREIGN KEY(id_discipline) REFERENCES disciplines(id)
);
CREATE TABLE questions (
    id int unsigned not null auto_increment,
    title VARCHAR(200) not null,
    question_description VARCHAR(255),
    id_lesson int unsigned not null,

    CONSTRAINT pk_questions PRIMARY KEY (id),
    CONSTRAINT fk_question_lesson FOREIGN KEY(id_lesson) REFERENCES lessons(id)
);
CREATE TABLE answers(
    id int unsigned not null auto_increment,
    id_question int unsigned not null,
    answerText VARCHAR(100) not null,
    isRight boolean not null,
    weigth int unsigned not null,

    CONSTRAINT pk_answers PRIMARY KEY(id),
    CONSTRAINT fk_answer_question FOREIGN KEY(id_question) REFERENCES questions(id)
);
CREATE TABLE topics(
    id int unsigned not null auto_increment,
    path VARCHAR(255) not null,
    type VARCHAR(10) not null,
    id_lesson int unsigned not null, 

    CONSTRAINT pk_topic PRIMARY KEY(id),
    CONSTRAINT fk_topic_lesson FOREIGN KEY(id_lesson) REFERENCES lessons(id)
);