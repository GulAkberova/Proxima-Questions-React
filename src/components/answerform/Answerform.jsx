import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuestions } from "../../context/QuestionsContext";
import "./answerform.css";

function AnswerForm() {
  const { t } = useTranslation();
  const params = useParams();
  const { allQuestions, handleInputChange, updateQuestion, setAllQuestions } =
    useQuestions();

  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [editableAnswers, setEditableAnswers] = useState({});

  const handleUpdate = () => {
    updateQuestion(
      "documentId123",
      "section1",
      "question1",
      "New Answer",
      setAllQuestions
    );
  };

  useEffect(() => {
    if (params.id) {
      const filtered = allQuestions.filter((q) =>
        q.questions.some((question) => question.answers.q1 === params.id)
      );
      setFilteredQuestions(filtered);
    }
  }, [params.id, allQuestions]);

  useEffect(() => {
    if (filteredQuestions.length > 0) {
      const sectionsArray = filteredQuestions[0].questions.map((q) => ({
        label: t(`sections.${q.section}`, { defaultValue: q.section }),
        key: q.section,
      }));
      setSections(sectionsArray);
    }
  }, [filteredQuestions, t]);

  const handleTabChange = (index) => {
    setSelectedTab(index);
  };

  const handleEditClick = (section, key) => {
    setEditableAnswers((prev) => ({
      ...prev,
      [`${section}-${key}`]: !prev[`${section}-${key}`],
    }));
  };

  const handleInputChangeWrapper = (e, docId, section, key) => {
    const { value } = e.target;
    handleInputChange(docId, section, key, value);
  };

  return (
    <div className="container">
      <div className="answerform">
        {sections.map((sec, idx) => (
          <button
            key={sec.key}
            className={`tab-button ${selectedTab === idx ? "active" : ""}`}
            onClick={() => handleTabChange(idx)}
          >
            {sec.label}
          </button>
        ))}
      </div>

      <div className="tab-content-question">
        {filteredQuestions.map((questionSet, idx) =>
          questionSet.questions
            .filter((q) => q.section === sections[selectedTab]?.key)
            .map((q, questionIdx) => (
              <div key={questionIdx}>
                <div>
                  {Object.entries(q.answers)
                    .sort(([a], [b]) => a.localeCompare(b))
                    .map(([answerKey, answer], answerIdx) => (
                      <div key={answerIdx} className="input-group-answer">
                        <label>
                          <div></div>
                          {t(`questions.${q.section}.${answerKey}`, {
                            defaultValue: answerKey,
                          })}
                          :
                        </label>
                        <div>
                          <textarea
                            type="text"
                            value={answer || ""}
                            readOnly={
                              !editableAnswers[`${q.section}-${answerKey}`]
                            }
                            onChange={(e) =>
                              handleInputChangeWrapper(
                                e,
                                questionSet.id,
                                q.section,
                                answerKey
                              )
                            }
                            className="readonly-input"
                            rows={3}
                            style={{ width: "100%" }}
                          />
                          {/* <button
                            onClick={() =>
                              handleEditClick(q.section, answerKey)
                            }
                            className="edit-button"
                          >
                            {editableAnswers[`${q.section}-${answerKey}`]
                              ? "🦾"
                              : "✏️"}
                          </button> */}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
}

export default AnswerForm;
