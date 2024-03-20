import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import CovidDetailService from '../services/covidDetailService';
import VaccinationService from '../services/vaccinationService';
import MemberService from '../services/memberService'; 

function Statistics() {
    const [dailyPatients, setDailyPatients] = useState([]);
    const [notVaccinatedCount, setNotVaccinatedCount] = useState(0);
    const [totalMembersCount, setTotalMembersCount] = useState(0);

    useEffect(() => {
        async function fetchStatistics() {
            const dailyPatientsData = await CovidDetailService.getActivePatientsCountLastMonth();
            const notVaccinatedMembersCount = await VaccinationService.getNotVaccinatedMembersCount();
            const totalMembers=  await MemberService.getAll();
            const totalMembersCount = totalMembers.length;
           
            setDailyPatients(dailyPatientsData);
            setNotVaccinatedCount(notVaccinatedMembersCount);
            setTotalMembersCount(totalMembersCount);
        }

        fetchStatistics();
    }, []);

    useEffect(() => {
        const ctx = document.getElementById('dailyPatientsChart').getContext('2d');
        const dailyPatientsChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dailyPatients.map(day => new Date(day.date).toLocaleDateString()),
                datasets: [{
                    label: 'Daily Patients',
                    data: dailyPatients.map(day => day.activePatientsCount),
                    borderColor: 'blue',
                    backgroundColor: 'rgba(0, 0, 255, 0.2)',
                }],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });

        return () => dailyPatientsChart.destroy();
    }, [dailyPatients]);

    useEffect(() => {
        if (totalMembersCount > 0) {
            const ctx = document.getElementById('vaccinationChart').getContext('2d');
            const vaccinationChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Vaccinated', 'Not Vaccinated'],
                    datasets: [{
                        label: 'Vaccination Status',
                        data: [totalMembersCount - notVaccinatedCount, notVaccinatedCount],
                        backgroundColor: ['green', 'red'],
                    }],
                },
            });

            return () => vaccinationChart.destroy();
        }
    }, [totalMembersCount, notVaccinatedCount]);

    return (
        <div>
            <h2>Statistics</h2>
            <div style={{ width: '400px', height: '400px' }}>
                <h3>Daily Patients</h3>
                <canvas id="dailyPatientsChart"></canvas>
            </div>
            <div style={{ width: '400px', height: '400px' }}>
                <h3>Vaccination Status</h3>
                <canvas id="vaccinationChart"></canvas>
            </div>
            <div>
                <h3>Not Vaccinated Members Count: {notVaccinatedCount}</h3>
            </div>
        </div>
    );
}

export default Statistics;
 
    