package com.flock.journal.homework;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;

import jakarta.persistence.ManyToMany;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import com.flock.journal.group.Group;
import com.flock.journal.student.Student;
import com.flock.journal.grade.Grade;
import com.flock.journal.lesson.Lesson;
import com.flock.journal.professor.Professor;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "homeworks")
public class Homework {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "hw_id")
  private Long id;

  @ManyToOne
  @JoinColumn(name = "lsn_id", nullable = false)
  private Lesson lesson;

  @ManyToOne
  @JoinColumn(name = "prof_id", nullable = false)
  private Professor professor;

  @Column(name = "description", columnDefinition = "TEXT")
  private String description;

  @JsonIgnore
  @OneToMany(mappedBy = "homework")
  private List<Grade> grades;

  @JsonIgnore
  @ManyToMany(mappedBy = "homeworks")
  private List<Group> groups;

  @JsonIgnore
  @ManyToMany(mappedBy = "homeworks")
  private List<Student> students;
}