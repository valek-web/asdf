import { useEffect, useState } from 'react';
import { questionTypes } from '../../../data/questionTypes';
import styles from './Question.module.scss';
import DeleteIcon from './icons/DeleteIcon';
import DeleteDemoIcon from './icons/DeleteDemoIcon';
import AddIcon from './icons/AddIcon';
import EditIcon from './icons/EditIcon';

export default function Question({ question, onUpdate, onDelete }) {
  const [selectedType, setSelectedType] = useState();
  const [title, setTitle] = useState('');
  const [score, setScore] = useState(null);
  const [options, setOptions] = useState(question.options);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(true);

  const handleTitleChange = e => {
    setTitle(e.target.value);
    onUpdate(question.id, {
      ...question,
      title: e.target.value,
      options,
    });
  };

  const handleOptionChange = (index, newValue) => {
    const newOptions = options.map((option, i) =>
      i === index ? { ...option, title: newValue } : option,
    );
    setOptions(newOptions);

    onUpdate(question.id, {
      ...question,
      title,
      options: newOptions,
    });
  };

  const handleSave = () => {
    const allOptionsFilled = options.every(
      option => option.title?.trim() !== '',
    );
    const hasRightAnswer = options.some(option => option.isRight);

    if (title?.trim() !== '' && allOptionsFilled && hasRightAnswer) {
      setIsEditing(false);
      onUpdate(question.id, {
        ...question,
        title,
        options,
        mark: score,
      });
    } else {
      let errorMessage = '';
      if (title?.trim() === '') errorMessage += 'Заполните текст вопроса.\n';
      if (!allOptionsFilled) errorMessage += 'Заполните все варианты ответа.\n';
      if (!hasRightAnswer)
        errorMessage += 'Выберите правильный вариант ответа.\n';

      alert(errorMessage);
    }
  };

  const handleRadioChange = index => {
    const newOptions = options.map((option, i) => ({
      ...option,
      isRight: i === index,
    }));
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const deleteOption = index => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);

    if (selectedOptionIndex === index) {
      setSelectedOptionIndex(null);
    } else if (selectedOptionIndex > index) {
      setSelectedOptionIndex(selectedOptionIndex - 1);
    }

    onUpdate(question.id, { ...question, title, options: newOptions });
  };

  return (
    <div className={styles.Question}>
      {isEditing ? (
        <div className={styles.Setting}>
          <div className={styles.SettingTop}>
            <input
              className={styles.TitleInput}
              placeholder="Введите текст вопроса"
              value={title}
              onChange={handleTitleChange}
            />
            <select className={styles.TypesSelect}>
              {questionTypes.map(type => {
                return (
                  <option
                    key={type.id}
                    onChange={() => {
                      setSelectedType(type);
                    }}
                    className={styles.TypeOption}
                  >
                    {type.title}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={styles.SettingMain}>
            {options.map((option, index) => (
              <div key={index} className={styles.Option}>
                <input
                  className={styles.OptionRadioInput}
                  type="radio"
                  name={`question-${question.id}`}
                  checked={option.isRight}
                  onChange={() => handleRadioChange(index)}
                />
                <input
                  type="text"
                  value={option.title}
                  placeholder="Введите вариант ответа"
                  onChange={e => handleOptionChange(index, e.target.value)}
                  className={styles.OptionTextInput}
                />
                <button
                  className={styles.DeleteOptionButtons}
                  onClick={() => deleteOption(index)}
                >
                  <DeleteIcon />
                </button>
              </div>
            ))}
            <button onClick={addOption} className={styles.AddOptionButton}>
              <AddIcon /> Добавить вариант ответа
            </button>
          </div>
          <div className={styles.SettingBottom}>
            <div className={styles.SettingParameters}>
              <label className={styles.SettingParameter}>
                Баллы
                <input
                  className={styles.SettingParameterInput}
                  value={score}
                  onChange={e => setScore(e.target.value)}
                  type="number"
                />
              </label>
            </div>
            <div className={styles.SettingButtons}>
              <button
                className={`${styles.SettingButton} ${styles.SaveButton}`}
                onClick={handleSave}
              >
                Сохранить
              </button>
              <button
                className={`${styles.SettingButton} ${styles.DeleteButton}`}
                onClick={() => onDelete(question.id)}
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.Demo}>
          <h3 className={styles.DemoTitle}>{question.title}</h3>
          <span className={styles.DemoId}>{question.id}</span>
          <button
            className={styles.EditDemoButton}
            onClick={() => setIsEditing(true)}
          >
            <EditIcon />
          </button>
          <button
            className={styles.DeleteDemoButton}
            onClick={() => onDelete(question.id)}
          >
            <DeleteDemoIcon />
          </button>
          <div className={styles.DemoOptions}>
            {question.options.map((option, index) => {
              return (
                <div className={styles.DemoOption} key={index}>
                  <input
                    className={styles.OptionRadioInput}
                    type="radio"
                    name={`question-${question.id}`}
                    readOnly
                  />
                  <span>{option.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
