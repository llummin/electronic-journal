package com.flock.journal.division;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import com.flock.journal.department.Department;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "divisions")
public class Division {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "div_id")
  private Long id;

  @Column(name = "title", nullable = false, unique = true)
  private String title;

  @OneToMany(mappedBy = "division")
  private List<Department> departments;
}