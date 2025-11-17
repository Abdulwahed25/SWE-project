  document.addEventListener('DOMContentLoaded', function() {
            // Set schedule item heights based on duration
            const scheduleItems = document.querySelectorAll('.schedule-item');
            scheduleItems.forEach(item => {
                const duration = parseInt(item.getAttribute('data-duration'));
                item.style.height = `calc(${duration} * 60px + ${duration - 1} * 4px)`;
            });

            // Week navigation
            const prevBtn = document.querySelector('.prev-week');
            const nextBtn = document.querySelector('.next-week');
            const weekDisplay = document.querySelector('.current-week');

            let currentWeek = 0;
            const weeks = [
                'Week of Dec 4 - Dec 10',
                'Week of Dec 11 - Dec 17',
                'Week of Dec 18 - Dec 24'
            ];

            prevBtn.addEventListener('click', () => {
                if (currentWeek > 0) {
                    currentWeek--;
                    weekDisplay.textContent = weeks[currentWeek];
                }
            });

            nextBtn.addEventListener('click', () => {
                if (currentWeek < weeks.length - 1) {
                    currentWeek++;
                    weekDisplay.textContent = weeks[currentWeek];
                }
            });

            // Add event functionality
            const addEventBtn = document.querySelector('.add-event-btn');
            addEventBtn.addEventListener('click', () => {
                alert('Add event feature would open a form here');
            });
        });