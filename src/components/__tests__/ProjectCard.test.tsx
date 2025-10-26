import '@testing-library/jest-dom'
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ProjectCard from '../ProjectCard'
import { Project } from '@/types'

// Mock project data for testing
const mockProject: Project = {
  id: "1",
  projektnamn: 'Test Projekt',
  kortBeskrivning: 'Detta är en kort beskrivning av projektet',
  fullBeskrivning: 'En längre beskrivning av projektet',
  foreningsnamn: 'Test Förening',
  stad: 'Stockholm',
  budget: '150 000 kr',
  csrKategori: 'Miljö',
  fnMal: ['Mål 4: God utbildning', 'Mål 13: Klimatåtgärder']
}

// Mock project with badges
const mockProjectWithBadges: Project = {
  ...mockProject,
  id: "2",
  badges: ['NY', 'POPULÄR'],
  viewsLeft: 3
}

const mockOnClick = jest.fn()

describe('ProjectCard', () => {
  beforeEach(() => {
    mockOnClick.mockClear()
  })

  it('renderar projektkort med grundläggande information', () => {
    render(<ProjectCard project={mockProject} onClick={mockOnClick} />)

    expect(screen.getByText('Test Projekt')).toBeInTheDocument()
    expect(screen.getByText('Test Förening')).toBeInTheDocument()
    expect(screen.getByText('Stockholm')).toBeInTheDocument()
    expect(screen.getByText('Detta är en kort beskrivning av projektet')).toBeInTheDocument()
    expect(screen.getByText('Miljö')).toBeInTheDocument()
  })

  it('visar badges när de finns (NY, POPULÄR, VERIFIERAD)', () => {
    render(<ProjectCard project={mockProjectWithBadges} onClick={mockOnClick} />)

    expect(screen.getByText('NY')).toBeInTheDocument()
    expect(screen.getByText('POPULÄR')).toBeInTheDocument()
  })

  it('visar scarcity-element "Visningar kvar" när det finns', () => {
    render(<ProjectCard project={mockProjectWithBadges} onClick={mockOnClick} />)

    expect(screen.getByText('Visningar kvar: 3')).toBeInTheDocument()
  })

  it('visar inte scarcity-element när viewsLeft inte finns', () => {
    render(<ProjectCard project={mockProject} onClick={mockOnClick} />)

    expect(screen.queryByText(/Visningar kvar:/)).not.toBeInTheDocument()
  })

  it('korrekt färgkodning för badge NY (guld)', () => {
    render(<ProjectCard project={mockProjectWithBadges} onClick={mockOnClick} />)

    const nyBadge = screen.getByText('NY')
    expect(nyBadge).toHaveClass('bg-yellow-100', 'text-yellow-800')
  })

  it('korrekt färgkodning för badge POPULÄR (orange)', () => {
    render(<ProjectCard project={mockProjectWithBadges} onClick={mockOnClick} />)

    const popularBadge = screen.getByText('POPULÄR')
    expect(popularBadge).toHaveClass('bg-orange-100', 'text-orange-800')
  })

  it('anropar onClick när kortet klickas', () => {
    render(<ProjectCard project={mockProject} onClick={mockOnClick} />)

    fireEvent.click(screen.getByText('Test Projekt'))
    expect(mockOnClick).toHaveBeenCalledWith(mockProject)
  })
})