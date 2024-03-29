package com.flock.journal.student;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.flock.journal.semestergrades.SemesterGrade;
import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import com.flock.journal.homework.Homework;
import com.flock.journal.attendance.Attendance;
import com.flock.journal.grade.Grade;
import com.flock.journal.group.Group;
import com.flock.journal.user.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "students")
public class Student {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "stud_id")
  private Long id;

  @OneToOne
  @JoinColumn(name = "user_id")
  private User user;

  @ManyToOne
  @JoinColumn(name = "group_id")
  private Group group;

  @Column(name = "course", nullable = false)
  private int course;

  @Column(name = "major", nullable = false)
  private String major;

  @Column(name = "level", nullable = false)
  private String level;

  @Column(name = "admission_date")
  private LocalDate admissionDate;

  @Column(name = "graduation_date")
  private LocalDate graduationDate;

  @Column(name = "phone_number")
  private String phoneNumber;

  @JsonIgnore
  @OneToMany(mappedBy = "student")
  private List<Attendance> attendances;

  @JsonIgnore
  @OneToMany(mappedBy = "student")
  private List<Grade> grades;

  @JsonIgnore
  @ManyToMany
  @JoinTable(name = "homeworks_students",
      joinColumns = @JoinColumn(name = "stud_id"),
      inverseJoinColumns = @JoinColumn(name = "hw_id"))
  private List<Homework> homeworks;

  @JsonIgnore
  @OneToMany(mappedBy = "student")
  private List<SemesterGrade> semesterGrades;
}